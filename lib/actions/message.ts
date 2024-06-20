"use server";

import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import { connectToDB } from "../mongoose";
import { getUserByClerkId, getUserByUsername } from "./user";

export const sendMessage = async (
    from: models.User,
    to: models.User,
    message: string
) => {
    try {
        await connectToDB();
        console.log("Conexão com o banco de dados estabelecida.");

        const sender = await getUserByUsername(from.userName);
        const receiver = await getUserByUsername(to.userName);

        if (!sender || !receiver) {
            return { error: "Usuários não encontrados" };
        }

        const dateNow = new Date();

        const newMessage = new Message({
            sender: sender._id,
            receiver: receiver._id,
            content: message,
            timestamp: dateNow,
        });
        await newMessage.save();

        const updateConversation = await Conversation.findOneAndUpdate(
            {
                participants: {
                    $all: [
                        { $elemMatch: { $eq: sender._id } },
                        { $elemMatch: { $eq: receiver._id } },
                    ],
                },
            },
            {
                $set: {
                    lastMessage: newMessage._id,
                    updatedAt: dateNow,
                },
                $push: {
                    messages: newMessage._id,
                },
            }
        );

        if (!updateConversation) {
            const newConversation = new Conversation({
                participants: [sender._id, receiver._id],
                messages: [newMessage._id],
                lastMessage: newMessage._id,
                updatedAt: dateNow,
            });
            await newConversation.save();

            return JSON.stringify(newConversation);
        }

        return JSON.stringify(updateConversation);
    } catch (error) {
        return { error: "Erro ao enviar mensagem" };
    }
};

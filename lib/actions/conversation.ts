"use server";
import Conversation from "../models/conversation.model";
import { connectToDB } from "../mongoose";

export const getConversationByUsersIds = async (
    loggedUser: string,
    conversationWith: string
) => {
    try {
        await connectToDB();

        const conversation = await Conversation.findOne({
            participants: { $all: [loggedUser, conversationWith] },
        })
            .populate({
                path: "messages",
                populate: {
                    path: "sender receiver",
                    model: "User",
                },
            })
            .populate({
                path: "participants",
                model: "User",
            })
            .populate("lastMessage");

        return conversation;
    } catch (error) {
        console.log(error);
    }
};

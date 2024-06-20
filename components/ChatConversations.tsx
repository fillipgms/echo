"use client";
import { getConversationByUsersIds } from "@/lib/actions/conversation";
import React, { useEffect, useState } from "react";
import User from "./User";

const ChatConversations = ({
    loggedUser,
    messageTo,
}: {
    loggedUser: models.User;
    messageTo: models.User;
}) => {
    const [conversation, setConversation] =
        useState<models.Conversation | null>(null);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const conv = await getConversationByUsersIds(
                    loggedUser._id,
                    messageTo._id
                );

                if (!conv) {
                    console.log("Conversa não encontrada");
                    return;
                }

                const parsedConv = JSON.parse(conv);

                setConversation(parsedConv);
            } catch (error) {
                console.error("Erro ao buscar conversa:", error);
            }
        };

        fetchConversation();
    }, [loggedUser, messageTo]);

    if (!conversation) return;

    const groupMessages = () => {
        let groupedMessages: { [userId: string]: string[] } = {};

        conversation.messages.forEach((message) => {
            const userId = message.sender._id;
            if (!groupedMessages[userId]) {
                groupedMessages[userId] = [];
            }
            groupedMessages[userId].push(message.content);
        });

        return Object.keys(groupedMessages).map((userId) => (
            <User
                user={
                    conversation.messages.find(
                        (msg) => msg.sender._id === userId
                    )?.sender || ({} as models.User)
                }
                messages={groupedMessages[userId]}
                className="gap-4"
            />
        ));
    };

    return (
        <div className="overflow-y-scroll max-h-full pb-20 px-6 h-full">
            <div className="flex justify-end flex-col h-full gap-3">
                {groupMessages()}
            </div>
        </div>
    );
};

export default ChatConversations;

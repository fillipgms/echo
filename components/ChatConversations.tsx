import { getConversationByUsersIds } from "@/lib/actions/conversation";
import React from "react";

const ChatConversations = async ({
    loggedUser,
    messageTo,
}: {
    loggedUser: models.User;
    messageTo: models.User;
}) => {
    const conversation = (await getConversationByUsersIds(
        loggedUser._id,
        messageTo._id
    )) as models.Conversation;

    return (
        <div className="overflow-y-scroll max-h-full pb-20 px-6 h-full">
            <div className="flex justify-end flex-col h-full gap-3">
                {conversation &&
                    conversation.messages.map((message) => (
                        <p>{message.content}</p>
                    ))}
            </div>
        </div>
    );
};

export default ChatConversations;

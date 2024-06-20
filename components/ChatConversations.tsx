import { getConversationByUsersIds } from "@/lib/actions/conversation";
import React from "react";
import User from "./User";
import { ScrollArea } from "./ui/scroll-area";

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

    if (!conversation) {
        return (
            <div className="max-h-full pb-20 px-6 h-full flex justify-end flex-col"></div>
        );
    }

    return (
        <div className=" max-h-full pb-20 px-6 pt-2 h-full">
            <ScrollArea className="flex justify-end flex-col h-full gap-3">
                {conversation &&
                    conversation.messages.map((message) => (
                        <User
                            key={message._id}
                            user={message.sender}
                            messages={[message.content]}
                        />
                    ))}
            </ScrollArea>
        </div>
    );
};

export default ChatConversations;

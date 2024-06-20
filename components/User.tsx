import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface UserComponentProps {
    displayName?: boolean;
    displayUsername?: boolean;
    onClick?: () => void;
    className?: string;
    user: models.User;
    size?: string;
    messages?: string[];
}

const User = ({
    displayName = true,
    displayUsername,
    onClick,
    className,
    user,
    size = "size-10",
    messages,
}: UserComponentProps) => {
    return (
        <div
            className={cn("flex items-center gap-2 ", className)}
            onClick={onClick}
        >
            <div className={cn(size, "rounded-full overflow-hidden ")}>
                <Image
                    src={user.profilePicture}
                    alt={`${user.firstName} profile pic`}
                    height={40}
                    width={40}
                />
            </div>
            <div className="flex-1">
                <div className="flex flex-col">
                    {displayName && (
                        <span className="text-sm font-medium">{`${user.firstName} ${user.lastName}`}</span>
                    )}
                    {displayUsername && (
                        <span className="text-xs font-light">
                            @{user.userName}
                        </span>
                    )}
                </div>
                <div className={messages ? "pt-1 text-slate-700" : ""}>
                    {messages &&
                        messages.map((message, i) => <p key={i}>{message}</p>)}
                </div>
            </div>
        </div>
    );
};

export default User;

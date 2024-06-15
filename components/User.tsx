import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface UserComponentProps {
    displayName?: boolean;
    displayUsername?: boolean;
    isMessage?: boolean;
    onClick?: () => void;
    className?: string;
    user: models.User;
}

const User = ({
    displayName = true,
    displayUsername,
    isMessage,
    onClick,
    className,
    user,
}: UserComponentProps) => {
    return (
        <div
            className={cn(className, "flex items-center gap-2")}
            onClick={onClick}
        >
            <div className=" size-10 rounded-full overflow-hidden">
                <Image
                    src={user.profilePicture}
                    alt={`${user.firstName} profile pic`}
                    height={40}
                    width={40}
                />
            </div>
            <div>
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
                {isMessage && (
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Laborum, magnam laudantium a commodi deleniti
                            eveniet quisquam molestiae blanditiis? Delectus
                            temporibus fuga illum quas sint incidunt illo
                            quisquam, eligendi deleniti! Doloremque.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;

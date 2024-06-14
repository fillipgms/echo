import { cn } from "@/lib/utils";
import React from "react";

interface UserComponentProps {
    displayName?: boolean;
    isMessage?: boolean;
    onClick?: () => void;
    className?: string;
}

const User = ({
    displayName = true,
    isMessage = false,
    onClick,
    className,
}: UserComponentProps) => {
    return (
        <div
            className={cn(className, "flex items-center gap-2")}
            onClick={onClick}
        >
            <div className=" size-10 bg-red-500 rounded-full"></div>
            <div>
                {displayName && (
                    <span className="text-sm font-medium">User test</span>
                )}
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

"use client";
import { cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import User from "./User";
import { getAllFriends } from "@/lib/actions/user";
import Link from "next/link";

const Sidebar = () => {
    const { userId } = useAuth();
    const [isOpen, setIsOpen] = useState(true);
    const [allFriends, setAllFriends] = useState<models.User[]>([]);

    if (!userId) return;

    const handleClick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await getAllFriends(userId);

            if (!response) return;

            setAllFriends(JSON.parse(response));
        };
        fetchFriends();
    }, [userId]);

    return (
        <aside
            className={cn(
                "h-svh relative md:w-72 transition-all md:translate-x-0 duration-300 ease-out w-full flex flex-col z-[999]",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div className="bg-slate-50 h-full">
                <div className="mt-6 mx-5">
                    <ul className="grid flex-1 grid-cols-3 text-sm bg-slate-200 *:py-2  *:text-center rounded-full overflow-hidden">
                        <li className="cursor-pointer">All</li>
                        <li className="cursor-pointer">Chats</li>
                        <li className="cursor-pointer">Groups</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3 py-5 px-6">
                    {allFriends.map((friend) => (
                        <Link href={`/chat/${friend.userName}`}>
                            <User
                                user={friend}
                                onClick={handleClick}
                                className="cursor-pointer"
                                displayUsername
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="bg-slate-300 bottom-0 absolute w-full flex items-center py-3 px-4">
                <UserButton
                    showName
                    appearance={{
                        elements: {
                            userButtonBox: {
                                flexDirection: "row-reverse",
                            },
                        },
                    }}
                />
            </div>
        </aside>
    );
};

export default Sidebar;

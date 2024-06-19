import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import User from "./User";
import { getAllFriends } from "@/lib/actions/user";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@clerk/nextjs/server";

const Sidebar = async () => {
    const user = await currentUser();

    if (!user) return;

    const allFriends = (await getAllFriends(user.id)) as models.User[];

    return (
        <aside
            className={cn(
                "hidden md:flex h-svh w-72 transition-all duration-300 ease-out flex-col relative"
            )}
        >
            <div className="bg-slate-50 h-full">
                <div className="mt-8 mx-5">
                    <ul className="grid flex-1 grid-cols-3 text-sm bg-slate-200 *:py-2  *:text-center rounded-full overflow-hidden">
                        <li className="cursor-pointer">All</li>
                        <li className="cursor-pointer">Chats</li>
                        <li className="cursor-pointer">Groups</li>
                    </ul>
                </div>

                <ScrollArea className="flex flex-col gap-3 py-5 px-6">
                    {allFriends &&
                        allFriends.map((friend) => (
                            <Link href={`/chat/${friend.userName}`}>
                                <User
                                    user={friend}
                                    className="cursor-pointer"
                                    displayUsername
                                />
                            </Link>
                        ))}
                </ScrollArea>
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

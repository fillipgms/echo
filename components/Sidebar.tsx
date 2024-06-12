"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const lineStyle = cn(
        "block w-6 h-1 bg-black transition-all duration-300 ease-out"
    );

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

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

                    <div className="flex md:hidden">
                        <button className="space-y-1" onClick={handleClick}>
                            <span
                                className={cn(
                                    lineStyle,
                                    isOpen
                                        ? "rotate-45 translate-y-2"
                                        : "-translate-y-0.5"
                                )}
                            ></span>
                            <span
                                className={cn(
                                    lineStyle,
                                    isOpen ? "opacity-0" : "opacity-100"
                                )}
                            ></span>
                            <span
                                className={cn(
                                    lineStyle,
                                    isOpen
                                        ? "-rotate-45 -translate-y-2"
                                        : "translate-y-0.5"
                                )}
                            ></span>
                        </button>
                    </div>
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

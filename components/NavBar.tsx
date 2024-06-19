"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = ["online", "everyone", "blocked", "add friends"];

const NavBar = () => {
    const pathName = usePathname();

    const normalizeText = (text: string) => {
        return text.toLowerCase().replace(" ", "");
    };

    return (
        <nav className="w-full bg-slate-200 px-4 pt-4 rounded-t-md overflow-scroll">
            <ul className="flex md:gap-6 gap-2 ">
                {navLinks.map((link, i) => {
                    const isActive =
                        `/${normalizeText(link)}` === pathName ||
                        (pathName === "/" && link === "online");

                    const url = i === 0 ? "/" : normalizeText(link);

                    return (
                        <li
                            key={i}
                            className={cn(
                                "capitalize rounded-t-md pb-1 px-4 bg-slate-200 pt-2 z-10 text-nowrap text-slate-700",

                                isActive &&
                                    "bg-slate-50 text-slate-950 relative after:z-[2] after:bg-slate-50 after:h-2 after:w-2 after:block after:absolute after:bottom-0 after:-right-2 after:bg-[radial-gradient(circle_at_right_top,_#e2e8f0_7px,_transparent_0)] before:bg-slate-50 before:h-2 before:w-2 before:block before:absolute before:bottom-0 before:-left-2 before:bg-[radial-gradient(circle_at_left_top,_#e2e8f0_7px,_transparent_0)]"
                            )}
                        >
                            <Link href={url}>{link}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavBar;

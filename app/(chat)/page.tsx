import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinks = ["online", "everyone", "pending", "blocked", "add friend"];

export default function Home() {
    return (
        <main>
            <nav className="w-full bg-slate-200 px-4 pt-3 rounded-t-md overflow-scroll">
                <ul className="flex md:gap-6 gap-2 ">
                    {navLinks.map((link, i) => {
                        const isActive = i === 0;

                        return (
                            <li
                                className={cn(
                                    "capitalize rounded-t-md pb-1 pt-2 px-4 bg-slate-200 z-10 text-nowrap",

                                    isActive &&
                                        "bg-slate-50 relative after:z-[2] after:bg-slate-50 after:h-2 after:w-2 after:block after:absolute after:bottom-0 after:-right-2 after:bg-[radial-gradient(circle_at_right_top,_#e2e8f0_7px,_transparent_0)] before:bg-slate-50 before:h-2 before:w-2 before:block before:absolute before:bottom-0 before:-left-2 before:bg-[radial-gradient(circle_at_left_top,_#e2e8f0_7px,_transparent_0)]"
                                )}
                            >
                                <Link href={"/"}>{link}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </main>
    );
}

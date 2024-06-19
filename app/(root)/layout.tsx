import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
    const user = currentUser();
    if (!user) {
        redirect("/login");
    }

    return (
        <div className="grid md:grid-cols-[18rem_1fr] grid-cols-1 relative min-h-svh">
            <Sidebar />
            <main className="z-[1] md:static absolute md:p-4 right-0 top-0 h-full w-full ">
                <div className="bg-slate-50 h-full w-full rounded-md">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default layout;

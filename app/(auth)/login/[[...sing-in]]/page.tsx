import { SignIn } from "@clerk/nextjs";
import React from "react";

const loginPage = () => {
    return (
        <main className="h-svh flex items-center justify-center">
            <SignIn />
        </main>
    );
};

export default loginPage;

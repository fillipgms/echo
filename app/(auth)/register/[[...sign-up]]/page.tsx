import React from "react";
import { SignUp } from "@clerk/nextjs";

const registerPage = () => {
    return (
        <main className="h-svh flex items-center justify-center">
            <SignUp />
        </main>
    );
};

export default registerPage;

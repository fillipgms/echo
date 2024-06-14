import AddFriendForm from "@/components/AddFriendForm";
import PendingFriendRequests from "@/components/PendingFriendRequests";
import ReceivedFriendRequests from "@/components/ReceivedFriendRequests";
import React, { Suspense } from "react";

const AddFriendPage = () => {
    return (
        <section className="py-4 p-6 space-y-4">
            <div className="space-y-2">
                <div>
                    <h2 className="text-xl font-semibold">Add Friends</h2>
                    <p>You can add friends with their echo username</p>
                </div>
                <AddFriendForm />
            </div>

            <Suspense fallback="loading">
                <ReceivedFriendRequests />
            </Suspense>

            <Suspense fallback="loading">
                <PendingFriendRequests />
            </Suspense>
        </section>
    );
};

export default AddFriendPage;

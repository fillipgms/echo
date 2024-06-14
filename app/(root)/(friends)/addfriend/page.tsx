import AddFriendForm from "@/components/AddFriendForm";
import PendingFriendRequests from "@/components/PendingFriendRequests";
import React, { Suspense } from "react";

const AddFriendPage = () => {
    const count = 2;

    return (
        <section className="py-4 p-6 space-y-4">
            <div className="space-y-2">
                <div>
                    <h2 className="text-xl font-semibold">Add Friend</h2>
                    <p>You can add friends with their echo username</p>
                </div>
                <AddFriendForm />
            </div>
            <div>
                <h3>Pending </h3>
                <Suspense fallback="loading">
                    <PendingFriendRequests />
                </Suspense>
            </div>
        </section>
    );
};

export default AddFriendPage;

import AddFriendForm from "@/components/AddFriendForm";
import React from "react";

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
                <h3>Pending - {count}</h3>
            </div>
        </section>
    );
};

export default AddFriendPage;

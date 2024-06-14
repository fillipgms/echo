import { getFriendRequestsByUserId } from "@/lib/actions/friendRequest";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import User from "./User";

const PendingFriendRequests = async () => {
    const user = await currentUser();
    if (!user) return;

    const allRequestsSent = await getFriendRequestsByUserId(user.id);

    if (!allRequestsSent) {
        return (
            <div>
                <h3 className="text-md font-semibold">Pending - 0</h3>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-md font-semibold">
                Pending - {allRequestsSent.length}
            </h3>
            <div className="mt-3 pl-5 overflow-y-scroll">
                {allRequestsSent.map((request) => (
                    <User user={request.toUserId[0]} displayUsername />
                ))}
            </div>
        </div>
    );
};

export default PendingFriendRequests;

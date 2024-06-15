import { getPendingRequestsByClerkId } from "@/lib/actions/friendRequest";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import User from "./User";

const PendingFriendRequests = async () => {
    const user = await currentUser();

    if (!user) return;

    const pendingRequests = await getPendingRequestsByClerkId(user.id);

    return (
        <div>
            <div>
                <h3 className="text-md font-semibold">
                    Pending - {pendingRequests.length}
                </h3>
            </div>
            <div className="mt-4 pl-5 overflow-y-scroll space-y-3">
                {pendingRequests.map((request) => (
                    <User user={request.toUserId[0]} />
                ))}
            </div>
        </div>
    );
};

export default PendingFriendRequests;

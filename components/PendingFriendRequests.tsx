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
                <h3 className="text-sm font-semibold  text-slate-800">
                    Pending - {pendingRequests.length}
                </h3>
            </div>
            <div className="mt-4 pl-5 overflow-y-scroll space-y-3">
                {pendingRequests.map((request) => (
                    <User
                        user={request.toUserId[0]}
                        key={request.toUserId[0]._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default PendingFriendRequests;

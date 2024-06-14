import { getReceivedFriendRequestsByUserId } from "@/lib/actions/friendRequest";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import User from "./User";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const ReceivedFriendRequests = async () => {
    const user = await currentUser();
    if (!user) return;

    const allReceivedRequests = await getReceivedFriendRequestsByUserId(
        user.id
    );

    if (!allReceivedRequests) {
        return (
            <div>
                <h3 className="text-md font-semibold">Received - 0</h3>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-md font-semibold">
                Received - {allReceivedRequests.length}
            </h3>
            <div className="mt-3 pl-5 overflow-y-scroll">
                {allReceivedRequests.map((request) => (
                    <div className="flex items-center justify-between">
                        <User user={request.fromUserId[0]} displayUsername />
                        <div className="flex gap-3">
                            <button className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                                <MdCancel className="size-4" />
                            </button>
                            <button className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                                <FaCheckCircle className="size-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReceivedFriendRequests;

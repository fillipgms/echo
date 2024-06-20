"use client";
import {
    acceptFriendRequest,
    declineFriendRequest,
    getReceivedFriendRequestsByUserId,
} from "@/lib/actions/friendRequest";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import User from "./User";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ReceivedFriendRequests = () => {
    const { userId } = useAuth();
    const [receivedRequests, setReceivedRequests] = useState<
        models.FriendRequest[]
    >([]);

    useEffect(() => {
        if (!userId) return;

        const fetchRequests = async () => {
            try {
                const result = await getReceivedFriendRequestsByUserId(userId);
                setReceivedRequests(JSON.parse(result));
            } catch (error) {
                console.error("Error fetching friend requests:", error);
            }
        };

        fetchRequests();
    }, [userId]);

    if (!receivedRequests || receivedRequests.length === 0) {
        return (
            <div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                        Received - 0
                    </h3>
                </div>
            </div>
        );
    }

    const handleAccept = async (fromId: string, toId: string) => {
        await acceptFriendRequest(fromId, toId);
        setReceivedRequests(
            receivedRequests.filter(
                (request) => request.fromUserId[0]._id !== fromId
            )
        );
    };

    const handleDecline = async (fromId: string, toId: string) => {
        await declineFriendRequest(fromId, toId);
        setReceivedRequests(
            receivedRequests.filter(
                (request) => request.fromUserId[0]._id !== fromId
            )
        );
    };

    return (
        <div>
            <div>
                <h3 className="text-sm font-semibold text-slate-800">
                    Received - {receivedRequests.length}
                </h3>
            </div>
            <div className="mt-4 pl-5 overflow-y-scroll space-y-3">
                {receivedRequests.map((request, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <User user={request.fromUserId[0]} displayUsername />

                        <div className="flex gap-3">
                            <button
                                onClick={() =>
                                    handleAccept(
                                        request.fromUserId[0]._id,
                                        request.toUserId[0]._id
                                    )
                                }
                                className="bg-emerald-500/15 py-3 px-5 rounded-md flex items-center gap-x-2 text-sm text-emerald-500"
                            >
                                <FaCheckCircle className="size-4" />
                            </button>
                            <button
                                onClick={() =>
                                    handleDecline(
                                        request.fromUserId[0]._id,
                                        request.toUserId[0]._id
                                    )
                                }
                                className="bg-destructive/15 py-3 px-5 rounded-md flex items-center gap-x-2 text-sm text-destructive"
                            >
                                <FaTimesCircle className="size-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReceivedFriendRequests;

"use server";
import User from "../models/user.model";
import FriendRequest from "../models/friendRequest.model";
import { connectToDB } from "@/lib/mongoose";

export const addFriendRequestByUsername = async (
    myUserId: string,
    username: string
) => {
    try {
        await connectToDB();
        const requestFrom = await User.findOne({ clerkId: myUserId });
        if (!requestFrom) {
            return { error: `UserId ${myUserId} not found.` };
        }

        const requestTo = await User.findOne({ userName: username });
        if (!requestTo) {
            return { error: `Username ${username} not found` };
        }

        if (requestFrom.clerkId === requestTo.clerkId) {
            return { error: `You can't send a friend request to yourself` };
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { fromUserId: requestFrom.id, toUserId: requestTo.id },
                { fromUserId: requestTo.id, toUserId: requestFrom.id },
            ],
        });

        if (existingRequest) {
            return {
                error: `You've already sent or received a request for this user`,
            };
        }

        const isAlreadyFriends = await User.findOne({
            $or: [
                { _id: requestFrom.id, friends: requestTo },
                { _id: requestTo.id, friends: requestFrom },
            ],
        });

        if (isAlreadyFriends) {
            return {
                error: `You are already friends`,
            };
        }

        const newRequest = new FriendRequest({
            fromUserId: requestFrom.id,
            toUserId: requestTo.id,
        });

        await newRequest.save();

        return { success: `friend request sent!` };
    } catch (error) {
        return { error: `error: ${error}` };
    }
};

export const getReceivedFriendRequestsByUserId = async (userId: string) => {
    try {
        await connectToDB();

        const userFromDB = await User.findOne({ clerkId: userId });
        if (!userFromDB) {
            throw new Error("User not found");
        }

        const receivedRequests = await FriendRequest.find({
            toUserId: userFromDB._id,
        })
            .populate("fromUserId")
            .populate("toUserId");

        return JSON.stringify(receivedRequests);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const acceptFriendRequest = async (
    fromUserId: string,
    toUserId: string
) => {
    try {
        await connectToDB();

        const isExistingRequest = await FriendRequest.findOne({
            fromUserId: fromUserId,
            toUserId: toUserId,
        });

        if (!isExistingRequest) {
            throw new Error("request not found");
        }

        await FriendRequest.deleteOne({
            fromUserId: fromUserId,
            toUserId: toUserId,
        });

        const fromUser = await User.findOne({
            _id: fromUserId,
        });
        const toUser = await User.findOne({
            _id: toUserId,
        });

        if (!fromUser || !toUser) {
            throw new Error("Users not found");
        }

        toUser.friends.push(fromUser);
        fromUser.friends.push(toUser);

        await fromUser.save();
        await toUser.save();

        return { success: true };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const declineFriendRequest = async (
    fromUserId: string,
    toUserId: string
) => {
    try {
        await connectToDB();

        const isExistingRequest = await FriendRequest.findOne({
            fromUserId: fromUserId,
            toUserId: toUserId,
        });

        if (!isExistingRequest) {
            throw new Error("request not found");
        }

        await FriendRequest.deleteOne({
            fromUserId: fromUserId,
            toUserId: toUserId,
        });

        return { success: true };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPendingRequestsByClerkId = async (clerkId: string) => {
    try {
        await connectToDB();

        const user = await User.findOne({ clerkId: clerkId });
        const pendingRequests = await FriendRequest.find({
            fromUserId: user._id,
        }).populate("toUserId");

        return pendingRequests;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

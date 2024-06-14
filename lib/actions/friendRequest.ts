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
        const requestFrom = await User.findOne({ id: myUserId });
        if (!requestFrom) {
            return { error: `UserId ${myUserId} not found.` };
        }

        const requestTo = await User.findOne({ userName: username });
        if (!requestTo) {
            return { error: `Username ${username} not found` };
        }

        const existingRequest = await FriendRequest.findOne({
            fromUserId: requestFrom.id,
            toUserId: requestTo.id,
        });

        if (existingRequest) {
            return { error: `You've already sent a request for this user` };
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

export const getFriendRequestsByUserId = async (id: string) => {
    try {
        await connectToDB();
        const user = await User.findOne({ clerkId: id });

        if (!user) return console.log("usuário não encontrado");

        const requests = await FriendRequest.find({
            fromUserId: user.id,
        }).populate("toUserId", "firstName lastName profilePicture userName");
        return requests;
    } catch (error) {
        console.error("Erro ao buscar solicitações de amizade:", error);
        throw error;
    }
};

export const getReceivedFriendRequestsByUserId = async (id: string) => {
    try {
        await connectToDB();
        const user = await User.findOne({ clerkId: id });

        if (!user) return console.log("usuário não encontrado");

        const requests = await FriendRequest.find({
            toUserId: user.id,
        }).populate("fromUserId", "firstName lastName profilePicture userName");
        return requests;
    } catch (error) {
        console.error("Erro ao buscar solicitações de amizade:", error);
        throw error;
    }
};

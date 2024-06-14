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
            throw new Error(`Usuário com ID ${myUserId} não encontrado.`);
        }

        const requestTo = await User.findOne({ userName: username });
        if (!requestTo) {
            throw new Error(`Usuário com username ${username} não encontrado.`);
        }

        const existingRequest = await FriendRequest.findOne({
            fromUserId: requestFrom.id,
            toUserId: requestTo.id,
        });

        if (existingRequest) {
            return;
        }

        const newRequest = new FriendRequest({
            fromUserId: requestFrom.id,
            toUserId: requestTo.id,
        });

        await newRequest.save();

        return newRequest;
    } catch (error) {
        return { error: error };
    }
};

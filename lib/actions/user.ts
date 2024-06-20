"use server";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";

export const createOrUpdateUser = async (
    id: string,
    first_name: string,
    last_name: string,
    image_url: string,
    email_addresses: models.EmailAdress[],
    username: string
) => {
    try {
        await connectToDB();
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    clerkId: id,
                    firstName: first_name,
                    lastName: last_name,
                    userName: username,
                    email: email_addresses[0].email_address,
                    profilePicture: image_url,
                },
            },
            { upsert: true, new: true }
        );

        await user.save();

        return user;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (id: string) => {
    try {
        await connectToDB();
        await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.log(error);
    }
};

export const getUserByUsername = async (username: string) => {
    try {
        await connectToDB();
        const user = await User.findOne({ userName: username });

        if (!user) throw new Error("Usuário não encontrado");

        return user;
    } catch (error) {
        console.log(error);
    }
};

export const getUserByClerkId = async (id: string) => {
    try {
        await connectToDB();
        const user = await User.findOne({ clerkId: id });

        if (!user) throw new Error("Usuário não encontrado");

        return user;
    } catch (error) {
        console.log(error);
    }
};

export const getAllFriends = async (clerkId: string) => {
    try {
        await connectToDB();
        const user = await User.findOne({ clerkId: clerkId }).populate(
            "friends"
        );
        if (!user) throw new Error("Usuário não encontrado");

        return user.friends;
    } catch (error) {
        console.log(error);
    }
};

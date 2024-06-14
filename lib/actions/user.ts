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
    console.log("chegou a rodar a função Create Or Update User");
    try {
        await connectToDB();
        console.log("chegou a rodar a função Connect To DB");
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
        console.log("chegou a salvar o usuário");
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

"user server";

import { connectToDB } from "@/lib/mongoose";
import User from "@/models";

export const createorUpdateUser = async ({
    id,
    first_name,
    last_name,
    image_url,
    email_adresses,
    username,
}: {
    id: string;
    first_name: string;
    last_name: string;
    image_url: string;
    email_adresses: models.EmailAdress[];
    username: string;
}) => {
    connectToDB();

    try {
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    clerkId: id,
                    firstName: first_name,
                    lastName: last_name,
                    userName: username,
                    email: email_adresses[0].email_address,
                    profilePicture: image_url,
                },
            },
            { upsert: true, new: true }
        );

        await user.save();
        return user;
    } catch (error) {
        console.log("error");
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

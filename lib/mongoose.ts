import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL)
        return console.log("couldnt find mongo db url");

    if (isConnected) return console.log("is already connected");

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("connected to mongo db");
    } catch (error) {
        console.log(error);
    }
};

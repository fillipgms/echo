import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: string,
        required: true,
        unique: true,
    },

    firstName: {
        type: string,
        required: true,
    },

    lastName: {
        type: string,
        required: true,
    },

    userName: {
        type: string,
        required: true,
    },

    email: {
        type: string,
        required: true,
    },

    profilePicture: {
        type: string,
        required: true,
    },

    friends: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },

    friendsRequest: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },

    Blocked: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model.User || mongoose.model("User", UserSchema);

export default User;

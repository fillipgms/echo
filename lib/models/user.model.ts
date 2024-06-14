import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    userName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    profilePicture: {
        type: String,
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

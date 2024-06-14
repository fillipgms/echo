import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: [{ type: mongoose.Schema.Types.String, ref: "User" }],
        default: "",
    },
    toUserId: {
        type: [{ type: mongoose.Schema.Types.String, ref: "User" }],
        default: "",
    },
    status: {
        type: String,
        default: "pending",
    },
});

const FriendRequest =
    mongoose.models.FriendRequest ||
    mongoose.model("Friend Requests", friendRequestSchema);

export default FriendRequest;

import mongoose from "mongoose";

// Definindo o esquema para a tabela de mensagens
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["sent", "delivered", "read"],
        default: "sent",
    },
});

const Message =
    mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;

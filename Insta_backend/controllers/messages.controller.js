const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        lastMessage: String,
        lastMessageTime: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const MessageSchema = new mongoose.Schema(
    {
        conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        image: String,
    },
    { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
const Message = mongoose.model("Message", MessageSchema);

// Get conversations
const getConversations = async (req, res) => {
    try {
        const userId = req.user._id;
        const conversations = await Conversation.find({ participants: userId })
            .populate("participants", "-password")
            .sort({ lastMessageTime: -1 });
        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).json({ message: "Error fetching conversations", error: err.message });
    }
};

// Get conversation messages
const getConversationMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId })
            .populate("sender", "username profileImg")
            .sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: "Error fetching messages", error: err.message });
    }
};

// Send message
const sendMessage = async (req, res) => {
    try {
        const { conversationId, text } = req.body;
        const sender = req.user._id;

        let conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const message = new Message({ conversationId, sender, text });
        await message.save();

        conversation.lastMessage = text;
        conversation.lastMessageTime = new Date();
        await conversation.save();

        const populatedMessage = await Message.findById(message._id).populate("sender", "username profileImg");
        res.status(201).json(populatedMessage);
    } catch (err) {
        res.status(500).json({ message: "Error sending message", error: err.message });
    }
};

// Create or get conversation
const createConversation = async (req, res) => {
    try {
        const userId1 = req.user._id;
        const { userId2 } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [userId1, userId2] },
        });

        if (!conversation) {
            conversation = new Conversation({ participants: [userId1, userId2] });
            await conversation.save();
        }

        await conversation.populate("participants", "-password");
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json({ message: "Error creating conversation", error: err.message });
    }
};

module.exports = { getConversations, getConversationMessages, sendMessage, createConversation, Conversation, Message };

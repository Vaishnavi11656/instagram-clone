const express = require("express");
const { verifyAuth } = require("../middlewares.js/verifyAuth");
const {
    getConversations,
    getConversationMessages,
    sendMessage,
    createConversation,
} = require("../controllers/messages.controller");

const messagesRouter = express.Router();

// Conversation routes
messagesRouter.get("/conversations", verifyAuth, getConversations);
messagesRouter.post("/conversation", verifyAuth, createConversation);
messagesRouter.get("/conversation/:conversationId", verifyAuth, getConversationMessages);

// Message routes
messagesRouter.post("/send", verifyAuth, sendMessage);

module.exports = { messagesRouter };

import { api } from "./client";

export function getConversationsApi() {
    return api.get("/messages/conversations");
}

export function getConversationApi(conversationId) {
    return api.get(`/messages/conversation/${conversationId}`);
}

export function sendMessageApi(conversationId, text) {
    return api.post("/messages/send", { conversationId, text });
}

export function searchConversationsApi(query) {
    return api.get(`/messages/search?q=${query}`);
}

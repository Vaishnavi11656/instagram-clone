import { api } from "./client";

export function getNotificationsApi() {
    return api.get("/notifications");
}

export function markNotificationAsReadApi(notificationId) {
    return api.put(`/notifications/${notificationId}/read`);
}

export function markAllNotificationsAsReadApi() {
    return api.put("/notifications/read-all");
}

export function deleteNotificationApi(notificationId) {
    return api.delete(`/notifications/${notificationId}`);
}

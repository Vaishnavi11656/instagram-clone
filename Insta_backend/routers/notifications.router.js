const express = require("express");
const { verifyAuth } = require("../middlewares.js/verifyAuth");
const {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    createNotification,
} = require("../controllers/notifications.controller");

const notificationsRouter = express.Router();

// Get notifications
notificationsRouter.get("/", verifyAuth, getNotifications);

// Mark all notifications as read (must come BEFORE :notificationId routes)
notificationsRouter.put("/read-all", verifyAuth, markAllNotificationsAsRead);

// Mark notification as read
notificationsRouter.put("/:notificationId/read", verifyAuth, markNotificationAsRead);

// Delete notification
notificationsRouter.delete("/:notificationId", verifyAuth, deleteNotification);

// Create notification
notificationsRouter.post("/", verifyAuth, createNotification);

module.exports = { notificationsRouter };

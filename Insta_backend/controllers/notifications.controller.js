const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
    {
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        type: { type: String, enum: ["like", "comment", "follow", "message"], required: true },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        message: String,
        read: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

// Get notifications
const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ recipient: userId })
            .populate("sender", "username profileImg")
            .populate("postId", "imageUrl")
            .sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Error fetching notifications", error: err.message });
    }
};

// Mark notification as read
const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { read: true },
            { new: true }
        );
        res.status(200).json(notification);
    } catch (err) {
        res.status(500).json({ message: "Error marking notification as read", error: err.message });
    }
};

// Mark all notifications as read
const markAllNotificationsAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.updateMany({ recipient: userId }, { read: true });
        res.status(200).json({ message: "All notifications marked as read" });
    } catch (err) {
        res.status(500).json({ message: "Error marking notifications as read", error: err.message });
    }
};

// Delete notification
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: "Notification deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting notification", error: err.message });
    }
};

// Create notification
const createNotification = async (req, res) => {
    try {
        const { recipient, sender, type, postId, message } = req.body;
        const notification = new Notification({
            recipient,
            sender,
            type,
            postId,
            message,
        });
        await notification.save();
        const populated = await notification.populate("sender", "username profileImg");
        res.status(201).json(populated);
    } catch (err) {
        res.status(500).json({ message: "Error creating notification", error: err.message });
    }
};

module.exports = { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, createNotification, Notification };

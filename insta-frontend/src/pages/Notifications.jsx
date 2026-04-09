import { useState, useEffect } from "react";
import { getNotificationsApi, deleteNotificationApi } from "../api/notifications.api";
import { IoHeart, IoChatbubble, IoPersonAdd, IoTrash, IoClose } from "react-icons/io5";

export const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadNotifications();
    }, []);

    async function loadNotifications() {
        setLoading(true);
        try {
            const data = await getNotificationsApi();
            setNotifications(data);
        } catch (err) {
            console.error("Error loading notifications:", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(notificationId) {
        try {
            await deleteNotificationApi(notificationId);
            setNotifications(notifications.filter((n) => n._id !== notificationId));
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case "like":
                return <IoHeart size={20} className="text-red-500" />;
            case "comment":
                return <IoChatbubble size={20} className="text-blue-500" />;
            case "follow":
                return <IoPersonAdd size={20} className="text-green-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto text-white">
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-3xl font-bold">Notifications</h1>
            </div>

            <div>
                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No notifications yet</div>
                ) : (
                    notifications.map((notif) => (
                        <div
                            key={notif._id}
                            className={`p-4 border-b border-gray-800 flex items-center justify-between hover:bg-gray-900 transition-all ${!notif.read ? "bg-gray-950" : ""
                                }`}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <img
                                    src={notif.senderImg || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"}
                                    alt={notif.senderName}
                                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm">
                                        <span className="font-bold">{notif.senderName}</span>
                                        {notif.type === "like" && " liked your post"}
                                        {notif.type === "comment" && " commented on your post"}
                                        {notif.type === "follow" && " started following you"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{notif.timestamp}</p>
                                </div>

                                <div className="flex-shrink-0">
                                    {getNotificationIcon(notif.type)}
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(notif._id)}
                                className="ml-4 p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <IoTrash size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

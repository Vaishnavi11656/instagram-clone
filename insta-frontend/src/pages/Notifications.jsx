import { useState, useEffect } from "react";
import {
    getNotificationsApi,
    deleteNotificationApi,
} from "../api/notifications.api";

import {
    IoHeart,
    IoChatbubble,
    IoPersonAdd,
    IoTrash,
    IoNotificationsOutline,
} from "react-icons/io5";

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

            setNotifications(
                notifications.filter((n) => n._id !== notificationId)
            );
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case "like":
                return (
                    <div className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                        <IoHeart size={18} className="text-red-400" />
                    </div>
                );

            case "comment":
                return (
                    <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
                        <IoChatbubble size={18} className="text-blue-400" />
                    </div>
                );

            case "follow":
                return (
                    <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                        <IoPersonAdd size={18} className="text-emerald-400" />
                    </div>
                );

            default:
                return (
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                        <IoNotificationsOutline
                            size={18}
                            className="text-gray-400"
                        />
                    </div>
                );
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#050509] text-white relative overflow-hidden">

            {/* ================= AMBIENT BACKGROUND ================= */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div
                    className="
                        absolute
                        w-[450px]
                        h-[450px]
                        rounded-full
                        bg-blue-600/10
                        blur-[140px]
                        -top-40
                        -left-40
                    "
                />

                <div
                    className="
                        absolute
                        w-[450px]
                        h-[450px]
                        rounded-full
                        bg-purple-600/10
                        blur-[150px]
                        top-[40%]
                        -right-60
                    "
                />

            </div>

            {/* ================= MAIN ================= */}

            <div className="relative w-full max-w-6xl mx-auto px-4 py-6">

                {/* ================= HEADER ================= */}

                <div
                    className="
                        sticky
                        top-4
                        z-30
                        mb-5
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-[#09090d]/85
                        backdrop-blur-2xl
                        shadow-[0_15px_50px_rgba(0,0,0,0.3)]
                    "
                >

                    <div className="px-5 py-5 flex items-center gap-4">

                        <div
                            className="
                                w-11
                                h-11
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                bg-blue-500/10
                                border
                                border-blue-500/15
                                text-blue-400
                            "
                        >
                            <IoNotificationsOutline size={23} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Notifications
                            </h1>

                            <p className="text-xs text-gray-500 mt-0.5">
                                Stay updated with your activity
                            </p>
                        </div>

                    </div>

                </div>

                {/* ================= NOTIFICATIONS ================= */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-white/[0.025]
                        backdrop-blur-2xl
                        overflow-hidden
                        shadow-[0_20px_70px_rgba(0,0,0,0.25)]
                    "
                >

                    {loading ? (

                        /* Loading */
                        <div className="py-20 flex flex-col items-center justify-center">

                            <div
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    border-2
                                    border-blue-500/20
                                    border-t-blue-500
                                    animate-spin
                                    mb-4
                                "
                            />

                            <p className="text-gray-500 text-sm">
                                Loading notifications...
                            </p>

                        </div>

                    ) : notifications.length === 0 ? (

                        /* Empty */
                        <div className="py-24 text-center">

                            <div
                                className="
                                    w-16
                                    h-16
                                    mx-auto
                                    rounded-2xl
                                    flex
                                    items-center
                                    justify-center
                                    bg-white/[0.04]
                                    border
                                    border-white/[0.07]
                                    mb-5
                                "
                            >
                                <IoNotificationsOutline
                                    size={30}
                                    className="text-gray-500"
                                />
                            </div>

                            <h2 className="text-lg font-semibold text-gray-300">
                                No notifications yet
                            </h2>

                            <p className="text-sm text-gray-600 mt-1">
                                New activity will appear here.
                            </p>

                        </div>

                    ) : (

                        /* Notification list */
                        <div>

                            {notifications.map((notif, index) => (

                                <div
                                    key={notif._id}
                                    className={`
                                        group
                                        relative
                                        px-6
                                        py-5
                                        flex
                                        items-center
                                        gap-4
                                        transition-all
                                        duration-200
                                        hover:bg-white/[0.035]
                                        ${index !== notifications.length - 1
                                            ? "border-b border-white/[0.05]"
                                            : ""
                                        }
                                        ${!notif.read
                                            ? "bg-blue-500/[0.025]"
                                            : ""
                                        }
                                    `}
                                >

                                    {/* Unread indicator */}
                                    {!notif.read && (
                                        <div
                                            className="
                                                absolute
                                                left-0
                                                top-1/2
                                                -translate-y-1/2
                                                w-[3px]
                                                h-10
                                                rounded-r-full
                                                bg-blue-500
                                                shadow-[0_0_12px_rgba(59,130,246,0.7)]
                                            "
                                        />
                                    )}

                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">

                                        <img
                                            src={
                                                notif.senderImg ||
                                                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"
                                            }
                                            alt={notif.senderName}
                                            className="
                                                w-12
                                                h-12
                                                rounded-full
                                                object-cover
                                                border
                                                border-white/[0.1]
                                                ring-2
                                                ring-black/20
                                            "
                                        />

                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">

                                        <p className="text-sm text-gray-300 leading-relaxed">

                                            <span className="font-bold text-white">
                                                {notif.senderName}
                                            </span>

                                            {notif.type === "like" &&
                                                " liked your post"}

                                            {notif.type === "comment" &&
                                                " commented on your post"}

                                            {notif.type === "follow" &&
                                                " started following you"}

                                        </p>

                                        <p className="text-xs text-gray-600 mt-1.5">
                                            {notif.timestamp}
                                        </p>

                                    </div>

                                    {/* Type icon */}
                                    <div className="flex-shrink-0">
                                        {getNotificationIcon(notif.type)}
                                    </div>

                                    {/* Delete */}
                                    <button
                                        onClick={() =>
                                            handleDelete(notif._id)
                                        }
                                        className="
                                            flex-shrink-0
                                            ml-1
                                            w-9
                                            h-9
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            text-gray-600
                                            hover:text-red-400
                                            hover:bg-red-500/10
                                            border
                                            border-transparent
                                            hover:border-red-500/10
                                            transition-all
                                            opacity-0
                                            group-hover:opacity-100
                                        "
                                        title="Delete notification"
                                    >
                                        <IoTrash size={17} />
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};
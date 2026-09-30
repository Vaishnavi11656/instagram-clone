import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
    getConversationsApi,
    getConversationApi,
    sendMessageApi,
} from "../api/messages.api";

import {
    IoSend,
    IoPaperPlane,
    IoVideocamOutline,
    IoCallOutline,
    IoInformationCircleOutline,
    IoImageOutline,
    IoHeartOutline,
    IoSearchOutline,
} from "react-icons/io5";

import { BsEmojiSmile } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

export const Messages = () => {
    const { user } = useContext(AuthContext);

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        const loadConversations = async () => {
            console.log("loadConversations called");

            try {
                console.log("About to call getConversationsApi...");

                const data = await getConversationsApi();

                console.log("Got conversations:", data);

                setConversations(data);
            } catch (err) {
                console.error(
                    "❌ Error loading conversations:",
                    err?.message || err
                );

                setConversations([]);
            }
        };

        if (user?.username) {
            console.log(
                "Messages component mounted, user:",
                user?.username
            );

            loadConversations();
        }
    }, [user?.username]);

    async function handleSelectConversation(conv) {
        setSelectedConversation(conv);

        try {
            const otherParticipant = conv.participants.find(
                (p) => p._id !== user._id
            );

            setSelectedConversation({
                ...conv,
                participantId: otherParticipant._id,
                participantName: otherParticipant.username,
                participantImg: otherParticipant.profileImg,
            });

            const msgs = await getConversationApi(conv._id);

            setMessages(msgs);
        } catch (err) {
            console.error("Error loading messages:", err);
        }
    }

    async function handleSendMessage(e) {
        e.preventDefault();

        if (!messageText.trim() || !selectedConversation) return;

        try {
            const newMessage = await sendMessageApi(
                selectedConversation._id,
                messageText
            );

            setMessages([...messages, newMessage]);
            setMessageText("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    }

    return (
        <div className="w-full h-screen bg-[#050509] text-white flex font-sans overflow-hidden relative">

            {/* ================= AMBIENT BACKGROUND ================= */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div
                    className="
                        absolute
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-blue-600/10
                        blur-[150px]
                        -top-40
                        right-10
                    "
                />

                <div
                    className="
                        absolute
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-purple-600/10
                        blur-[160px]
                        bottom-[-200px]
                        left-[35%]
                    "
                />

            </div>

            {/* ================= CONVERSATIONS ================= */}

            <div
                className="
                    relative
                    w-[360px]
                    xl:w-[390px]
                    border-r
                    border-white/[0.07]
                    bg-[#08080d]/80
                    backdrop-blur-2xl
                    flex
                    flex-col
                    flex-shrink-0
                    z-10
                "
            >

                {/* Header */}
                <div
                    className="
                        h-[82px]
                        px-6
                        border-b
                        border-white/[0.06]
                        flex
                        items-center
                        justify-between
                        shrink-0
                    "
                >

                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            {user?.username}
                        </h1>

                        <p className="text-xs text-gray-600 mt-1">
                            Direct messages
                        </p>
                    </div>

                    <button
                        className="
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            bg-white/[0.05]
                            border
                            border-white/[0.07]
                            text-gray-300
                            hover:bg-white/[0.1]
                            hover:text-white
                            transition-all
                        "
                    >
                        <FiEdit size={19} />
                    </button>

                </div>

                {/* Search */}
                <div className="px-5 pt-5 pb-3">

                    <div
                        className="
                            h-10
                            rounded-xl
                            bg-white/[0.04]
                            border
                            border-white/[0.06]
                            flex
                            items-center
                            gap-3
                            px-3
                        "
                    >
                        <IoSearchOutline
                            size={18}
                            className="text-gray-500"
                        />

                        <span className="text-sm text-gray-600">
                            Search messages
                        </span>
                    </div>

                </div>

                {/* Messages heading */}
                <div className="px-6 py-3 flex items-center justify-between">

                    <span className="font-bold text-sm">
                        Messages
                    </span>

                    <span
                        className="
                            text-xs
                            text-blue-400
                            font-semibold
                            cursor-pointer
                            hover:text-blue-300
                            transition
                        "
                    >
                        Requests
                    </span>

                </div>

                {/* Conversation list */}
                <div className="flex-1 overflow-y-auto px-2 pb-4">

                    {conversations.length === 0 ? (

                        <div className="text-center py-16 px-6">

                            <div
                                className="
                                    w-14
                                    h-14
                                    rounded-2xl
                                    mx-auto
                                    flex
                                    items-center
                                    justify-center
                                    bg-white/[0.04]
                                    border
                                    border-white/[0.06]
                                    mb-4
                                "
                            >
                                <IoPaperPlane
                                    size={24}
                                    className="text-gray-500"
                                />
                            </div>

                            <p className="text-gray-400 text-sm">
                                No conversations yet
                            </p>

                        </div>

                    ) : (

                        conversations.map((conv) => {

                            const otherParticipant =
                                conv.participants.find(
                                    (p) => p._id !== user._id
                                );

                            const isActive =
                                selectedConversation?._id === conv._id;

                            return (
                                <button
                                    key={conv._id}
                                    onClick={() =>
                                        handleSelectConversation(conv)
                                    }
                                    className={`
                                        w-full
                                        px-4
                                        py-3
                                        rounded-2xl
                                        flex
                                        items-center
                                        gap-3
                                        text-left
                                        transition-all
                                        mb-1
                                        ${isActive
                                            ? "bg-blue-500/[0.10] border border-blue-500/[0.12]"
                                            : "hover:bg-white/[0.04] border border-transparent"
                                        }
                                    `}
                                >

                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">

                                        <img
                                            src={
                                                otherParticipant?.profileImg ||
                                                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"
                                            }
                                            alt={otherParticipant?.username}
                                            className={`
                                                w-14
                                                h-14
                                                rounded-full
                                                object-cover
                                                border
                                                ${isActive
                                                    ? "border-blue-400/50"
                                                    : "border-white/[0.08]"
                                                }
                                            `}
                                        />

                                        {/* Online indicator */}
                                        <span
                                            className="
                                                absolute
                                                right-0
                                                bottom-0
                                                w-3.5
                                                h-3.5
                                                rounded-full
                                                bg-emerald-400
                                                border-[3px]
                                                border-[#09090d]
                                            "
                                        />

                                    </div>

                                    {/* User info */}
                                    <div className="flex flex-col min-w-0 flex-1">

                                        <span
                                            className={`
                                                text-[15px]
                                                truncate
                                                ${isActive
                                                    ? "text-white font-semibold"
                                                    : "text-gray-200"
                                                }
                                            `}
                                        >
                                            {otherParticipant?.username}
                                        </span>

                                        <span className="text-[13px] text-gray-500 truncate mt-1">
                                            {conv.lastMessage ||
                                                "Active today"}
                                        </span>

                                    </div>

                                </button>
                            );
                        })

                    )}

                </div>

            </div>

            {/* ================= CHAT AREA ================= */}

            <div className="relative flex-1 flex flex-col min-w-0 z-10">

                {selectedConversation ? (

                    <div className="w-full flex-1 flex flex-col h-full min-h-0">

                        {/* ================= CHAT HEADER ================= */}

                        <div
                            className="
                                h-[82px]
                                px-7
                                border-b
                                border-white/[0.07]
                                bg-[#08080d]/70
                                backdrop-blur-2xl
                                flex
                                items-center
                                justify-between
                                shrink-0
                            "
                        >

                            <div className="flex items-center gap-3 cursor-pointer">

                                <div className="relative">

                                    <img
                                        src={
                                            selectedConversation.participantImg ||
                                            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"
                                        }
                                        alt={
                                            selectedConversation.participantName
                                        }
                                        className="
                                            w-11
                                            h-11
                                            rounded-full
                                            object-cover
                                            border
                                            border-white/[0.1]
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            right-0
                                            bottom-0
                                            w-3
                                            h-3
                                            rounded-full
                                            bg-emerald-400
                                            border-2
                                            border-[#09090d]
                                        "
                                    />

                                </div>

                                <div className="flex flex-col">

                                    <span className="text-[15px] font-bold text-white">
                                        {selectedConversation.participantName}
                                    </span>

                                    <span className="text-xs text-emerald-400 mt-0.5">
                                        Active now
                                    </span>

                                </div>

                            </div>

                            {/* Header actions */}
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <button
                                    className="
                                        w-10
                                        h-10
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-300
                                        hover:text-white
                                        hover:bg-white/[0.07]
                                        transition
                                    "
                                >
                                    <IoCallOutline size={21} />
                                </button>

                                <button
                                    className="
                                        w-10
                                        h-10
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-300
                                        hover:text-white
                                        hover:bg-white/[0.07]
                                        transition
                                    "
                                >
                                    <IoVideocamOutline size={22} />
                                </button>

                                <button
                                    className="
                                        w-10
                                        h-10
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-300
                                        hover:text-white
                                        hover:bg-white/[0.07]
                                        transition
                                    "
                                >
                                    <IoInformationCircleOutline size={22} />
                                </button>

                            </div>

                        </div>

                        {/* ================= MESSAGES ================= */}

                        <div
                            className="
                                flex-1
                                overflow-y-auto
                                px-6
                                md:px-10
                                py-6
                                flex
                                flex-col
                                gap-1
                                min-h-0
                            "
                        >

                            {/* Profile intro */}
                            <div
                                className="
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    mt-6
                                    mb-10
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        p-[2px]
                                        rounded-full
                                        bg-gradient-to-br
                                        from-blue-500
                                        via-purple-500
                                        to-fuchsia-500
                                    "
                                >

                                    <img
                                        src={
                                            selectedConversation.participantImg ||
                                            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"
                                        }
                                        className="
                                            w-24
                                            h-24
                                            rounded-full
                                            object-cover
                                            border-4
                                            border-[#07070b]
                                        "
                                    />

                                </div>

                                <span className="font-bold text-xl mt-1">
                                    {selectedConversation.participantName}
                                </span>

                                <span className="text-xs text-gray-500">
                                    Start a conversation
                                </span>

                                <button
                                    className="
                                        mt-1
                                        bg-white/[0.07]
                                        border
                                        border-white/[0.08]
                                        text-white
                                        font-semibold
                                        text-sm
                                        px-5
                                        py-2
                                        rounded-xl
                                        hover:bg-white/[0.12]
                                        transition-all
                                    "
                                >
                                    View Profile
                                </button>

                            </div>

                            {/* Message bubbles */}
                            {messages.map((msg, idx) => {

                                const isMe =
                                    msg.sender._id === user._id;

                                const isNextMe =
                                    messages[idx + 1] &&
                                    messages[idx + 1].sender._id === user._id;

                                const isPrevMe =
                                    messages[idx - 1] &&
                                    messages[idx - 1].sender._id === user._id;

                                return (
                                    <div
                                        key={msg._id}
                                        className={`
                                            flex
                                            w-full
                                            ${isMe
                                                ? "justify-end"
                                                : "justify-start"
                                            }
                                            ${!isNextMe
                                                ? "mb-4"
                                                : ""
                                            }
                                        `}
                                    >

                                        {!isMe && (

                                            <div
                                                className="
                                                    w-8
                                                    h-8
                                                    mr-2
                                                    shrink-0
                                                    flex
                                                    items-end
                                                "
                                            >

                                                {!isNextMe ? (
                                                    <img
                                                        src={
                                                            selectedConversation.participantImg
                                                        }
                                                        className="
                                                            w-full
                                                            h-full
                                                            rounded-full
                                                            object-cover
                                                            border
                                                            border-white/[0.08]
                                                        "
                                                    />
                                                ) : null}

                                            </div>

                                        )}

                                        <div
                                            className={`
                                                max-w-[70%]
                                                px-4
                                                py-2.5
                                                text-[15px]
                                                leading-[1.4]
                                                break-words
                                                shadow-sm
                                                ${isMe
                                                    ? `
                                                            bg-gradient-to-r
                                                            from-blue-600
                                                            to-indigo-600
                                                            text-white
                                                            ${isNextMe
                                                        ? "rounded-2xl rounded-br-sm"
                                                        : "rounded-3xl rounded-br-md"
                                                    }
                                                            ${isPrevMe
                                                        ? "rounded-tr-sm"
                                                        : ""
                                                    }
                                                        `
                                                    : `
                                                            bg-white/[0.07]
                                                            border
                                                            border-white/[0.06]
                                                            text-gray-100
                                                            ${isNextMe
                                                        ? "rounded-2xl rounded-bl-sm"
                                                        : "rounded-3xl rounded-bl-md"
                                                    }
                                                            ${isPrevMe
                                                        ? "rounded-tl-sm"
                                                        : ""
                                                    }
                                                        `
                                                }
                                            `}
                                            title={new Date(
                                                msg.createdAt
                                            ).toLocaleString()}
                                        >
                                            {msg.text}
                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                        {/* ================= MESSAGE INPUT ================= */}

                        <div className="px-5 md:px-8 pb-5 pt-2 shrink-0">

                            <form
                                onSubmit={handleSendMessage}
                                className="
                                    flex
                                    gap-3
                                    items-center
                                    bg-white/[0.045]
                                    backdrop-blur-xl
                                    rounded-2xl
                                    px-4
                                    py-2.5
                                    border
                                    border-white/[0.08]
                                    min-h-[52px]
                                    shadow-[0_10px_40px_rgba(0,0,0,0.2)]
                                "
                            >

                                <button
                                    type="button"
                                    className="
                                        text-gray-400
                                        hover:text-white
                                        transition
                                        flex-shrink-0
                                    "
                                >
                                    <BsEmojiSmile size={22} />
                                </button>

                                <input
                                    type="text"
                                    value={messageText}
                                    onChange={(e) =>
                                        setMessageText(e.target.value)
                                    }
                                    placeholder="Message..."
                                    className="
                                        flex-1
                                        bg-transparent
                                        border-none
                                        text-[15px]
                                        text-white
                                        placeholder-gray-600
                                        outline-none
                                    "
                                />

                                {messageText.trim() ? (

                                    <button
                                        type="submit"
                                        className="
                                            w-9
                                            h-9
                                            rounded-xl
                                            flex
                                            items-center
                                            justify-center
                                            bg-blue-600
                                            hover:bg-blue-500
                                            text-white
                                            transition-all
                                            shadow-lg
                                            shadow-blue-500/20
                                        "
                                    >
                                        <IoSend size={17} />
                                    </button>

                                ) : (

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            text-gray-400
                                            pr-1
                                        "
                                    >

                                        <button
                                            type="button"
                                            className="hover:text-white transition"
                                        >
                                            <IoImageOutline size={22} />
                                        </button>

                                        <button
                                            type="button"
                                            className="hover:text-pink-400 transition"
                                        >
                                            <IoHeartOutline size={22} />
                                        </button>

                                    </div>

                                )}

                            </form>

                        </div>

                    </div>

                ) : (

                    /* ================= EMPTY CHAT ================= */

                    <div className="flex-1 flex flex-col items-center justify-center h-full w-full">

                        <div
                            className="
                                relative
                                w-24
                                h-24
                                rounded-full
                                flex
                                items-center
                                justify-center
                                bg-gradient-to-br
                                from-blue-500/10
                                via-purple-500/10
                                to-fuchsia-500/10
                                border
                                border-white/[0.08]
                                shadow-[0_0_60px_rgba(99,102,241,0.12)]
                                mb-6
                            "
                        >

                            <IoPaperPlane
                                size={40}
                                className="text-gray-300"
                            />

                        </div>

                        <h2 className="text-2xl font-bold mb-2">
                            Your messages
                        </h2>

                        <p
                            className="
                                text-gray-500
                                mb-7
                                text-sm
                                text-center
                                max-w-sm
                            "
                        >
                            Send private photos and messages to a friend
                            or group.
                        </p>

                        <button
                            className="
                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600
                                hover:from-blue-500
                                hover:to-indigo-500
                                text-white
                                font-semibold
                                text-sm
                                px-6
                                py-2.5
                                rounded-xl
                                shadow-lg
                                shadow-blue-500/20
                                transition-all
                            "
                        >
                            Send message
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
};
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getConversationsApi, getConversationApi, sendMessageApi } from "../api/messages.api";
import { IoSend, IoPaperPlane, IoVideocamOutline, IoCallOutline, IoInformationCircleOutline, IoImageOutline, IoHeartOutline } from "react-icons/io5";
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
                console.error("❌ Error loading conversations:", err?.message || err);
                // Don't redirect on error, just show empty state
                setConversations([]);
            }
        };

        if (user?.username) {
            console.log("Messages component mounted, user:", user?.username);
            loadConversations();
        }
    }, [user?.username]);

    async function handleSelectConversation(conv) {
        setSelectedConversation(conv);
        try {
            // Get the other participant (not current user)
            const otherParticipant = conv.participants.find(p => p._id !== user._id);
            // Update selected conversation with participant info
            setSelectedConversation({
                ...conv,
                participantId: otherParticipant._id,
                participantName: otherParticipant.username,
                participantImg: otherParticipant.profileImg
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
            const newMessage = await sendMessageApi(selectedConversation._id, messageText);
            setMessages([...messages, newMessage]);
            setMessageText("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    }

    return (
        <div className="w-full h-screen bg-black flex text-white font-sans">
            {/* Conversations List */}
            <div className="w-[398px] border-r border-[#262626] flex flex-col flex-shrink-0">
                <div className="h-[75px] px-6 border-b border-[#262626] flex items-center justify-between shrink-0">
                    <h1 className="text-xl font-bold">{user?.username}</h1>
                    <FiEdit size={24} className="cursor-pointer text-[#f5f5f5]" />
                </div>

                <div className="flex-1 overflow-y-auto pt-2">
                    <div className="px-6 py-2 flex items-center justify-between">
                        <span className="font-bold text-base">Messages</span>
                        <span className="text-[#a8a8a8] font-semibold text-sm cursor-pointer">Requests</span>
                    </div>
                    {conversations.map((conv) => {
                        const otherParticipant = conv.participants.find(p => p._id !== user._id);
                        const isActive = selectedConversation?._id === conv._id;
                        return (
                            <button
                                key={conv._id}
                                onClick={() => handleSelectConversation(conv)}
                                className={`w-full px-6 py-2 flex items-center justify-between transition-colors ${isActive ? "bg-[#121212]" : "hover:bg-[#121212]"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={otherParticipant?.profileImg || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"}
                                        alt={otherParticipant?.username}
                                        className="w-14 h-14 rounded-full object-cover shrink-0"
                                    />
                                    <div className="flex flex-col items-start min-w-0">
                                        <span className="text-[15px] text-[#f5f5f5] truncate">{otherParticipant?.username}</span>
                                        <span className="text-[13px] text-[#a8a8a8] truncate max-w-[200px]">
                                            {conv.lastMessage || "Active today"}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col items-center min-w-0">
                {selectedConversation ? (
                    <div className="w-full flex-1 flex flex-col h-full bg-black min-h-0">
                        {/* Chat Header */}
                        <div className="h-[75px] px-6 border-b border-[#262626] flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3 cursor-pointer">
                                <img
                                    src={selectedConversation.participantImg || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"}
                                    alt={selectedConversation.participantName}
                                    className="w-11 h-11 rounded-full object-cover shrink-0"
                                />
                                <div className="flex flex-col">
                                    <span className="text-base font-bold text-[#f5f5f5] leading-5">{selectedConversation.participantName}</span>
                                    <span className="text-xs text-[#a8a8a8]">Active now</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 text-[#f5f5f5]">
                                <IoCallOutline size={26} className="cursor-pointer hover:opacity-70 transition-opacity" />
                                <IoVideocamOutline size={28} className="cursor-pointer hover:opacity-70 transition-opacity" />
                                <IoInformationCircleOutline size={28} className="cursor-pointer hover:opacity-70 transition-opacity" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-1 w-full min-h-0">
                            <div className="flex flex-col items-center justify-center my-10 gap-3">
                                <img
                                    src={selectedConversation.participantImg || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <span className="font-bold text-xl">{selectedConversation.participantName}</span>
                                <button className="bg-[#efefef] text-black font-semibold text-sm px-4 py-1.5 rounded-lg hover:bg-gray-300 transition-colors">
                                    View Profile
                                </button>
                            </div>

                            {messages.map((msg, idx) => {
                                const isMe = msg.sender._id === user._id;
                                const isNextMe = messages[idx + 1] && messages[idx + 1].sender._id === user._id;
                                const isPrevMe = messages[idx - 1] && messages[idx - 1].sender._id === user._id;
                                
                                return (
                                    <div
                                        key={msg._id}
                                        className={`flex w-full ${isMe ? "justify-end" : "justify-start"} ${!isNextMe ? "mb-4" : ""}`}
                                    >
                                        {!isMe && (
                                            <div className="w-7 h-7 mr-2 shrink-0 flex items-end">
                                               {(!isNextMe || messages[idx + 1].sender._id === user._id) ? (
                                                    <img src={selectedConversation.participantImg} className="w-full h-full rounded-full object-cover" /> 
                                               ) : null}
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[70%] px-[14px] py-[8px] text-[15px] flex items-center leading-[1.3] break-words ${isMe
                                                ? `bg-[#3797f0] text-white ${isNextMe ? 'rounded-2xl rounded-br-sm' : 'rounded-3xl rounded-br-[4px]'} ${isPrevMe ? 'rounded-tr-sm' : ''}`
                                                : `bg-[#262626] text-[#f5f5f5] ${isNextMe ? 'rounded-2xl rounded-bl-sm' : 'rounded-3xl rounded-bl-[4px]'} ${isPrevMe ? 'rounded-tl-sm' : ''}`
                                                }`}
                                            title={new Date(msg.createdAt).toLocaleString()}
                                        >
                                            <span>{msg.text}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 w-full shrink-0">
                            <form onSubmit={handleSendMessage} className="flex gap-4 items-center bg-[#262626] rounded-full px-4 py-2 border border-[#363636] min-h-[44px]">
                                <BsEmojiSmile size={24} className="text-[#f5f5f5] cursor-pointer shrink-0 hover:opacity-70 transition-opacity" />
                                <input
                                    type="text"
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Message..."
                                    className="flex-1 bg-transparent border-none text-[15px] text-[#f5f5f5] placeholder-[#a8a8a8] outline-none"
                                />
                                {messageText.trim() ? (
                                    <button
                                        type="submit"
                                        className="text-[#0095f6] font-semibold text-[14px] hover:text-white transition-colors px-2"
                                    >
                                        Send
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-4 text-[#f5f5f5] pr-1">
                                        <IoImageOutline size={24} className="cursor-pointer hover:opacity-70 transition-opacity" />
                                        <IoHeartOutline size={24} className="cursor-pointer hover:opacity-70 transition-opacity" />
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center h-full w-full">
                        <div className="w-24 h-24 border-2 border-white rounded-full flex items-center justify-center mb-4">
                            <IoPaperPlane size={48} className="mr-1" />
                        </div>
                        <h2 className="text-xl font-normal mb-2 text-[#f5f5f5]">Your messages</h2>
                        <p className="text-[#a8a8a8] mb-6 text-sm text-center">Send private photos and messages to a friend or group.</p>
                        <button className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold text-[14px] px-4 py-1.5 rounded-lg transition-colors">
                            Send message
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

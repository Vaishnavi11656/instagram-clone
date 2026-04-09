import Modal from "react-modal";
import { UserCard } from "../commons/UserCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext, BASE_URL } from "../../contexts/AuthContext";
import { IoClose } from "react-icons/io5";


const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        width: "900px",
        height: "600px",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #111 0%, #0a0a0a 100%)",
        color: "#fff",
        padding: 0,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
    },
};

export const CommentModal = ({ open, setOpen, post, onCommentAdd }) => {
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (!open) return;
        async function loadData() {
            try {
                const res = await fetch(`${BASE_URL}/comments/${post._id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                const data = await res.json();
                setComments(data.comments || []);
            } catch (err) {
                alert(err.message);
            }
        }

        loadData();
    }, [open, post, user]);

    function handleClose() {
        setOpen(false);
    }

    async function addNewComment() {
        if (!value.trim()) return;
        try {
            const res = await fetch(`${BASE_URL}/comments/${post._id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ text: value }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || "Failed to post comment");
                return;
            }

            setComments((prev) => [
                ...prev,
                {
                    _id: data._id,
                    text: data.text,
                    author: {
                        username: user.username,
                        name: user.name,
                        email: user.email,
                    },
                    createdAt: data.createdAt,
                },
            ]);

            setValue("");
            onCommentAdd?.(post._id);
        } catch (err) {
            alert("Error posting comment: " + err.message);
        }
    }

    const defaultAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";

    return (
        <Modal
            isOpen={open}
            onRequestClose={handleClose}
            style={customStyles}
        >
            <div className="flex w-full h-[600px] bg-black relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white z-10 hover:bg-gray-800 hover:scale-110 transition-all duration-200 rounded-full p-2"
                >
                    <IoClose size={24} />
                </button>

                {/* Left Side: Image */}
                <div className="w-[55%] bg-[#0a0a0a] flex items-center justify-center group relative">
                    <img src={post.imageUrl} className="max-w-full max-h-full object-contain" alt="Post" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>

                {/* Right Side: Comments and Details */}
                <div className="w-[45%] flex flex-col bg-black border-l border-gray-800 h-full">

                    {/* Header: Post Author */}
                    <div className="p-4 border-b border-gray-800 flex items-center gap-3 hover:bg-[#0a0a0a] transition-colors">
                        <img
                            src={post.author?.profileImg || defaultAvatar}
                            className="w-9 h-9 rounded-full object-cover"
                            alt={post.author?.username}
                        />
                        <span className="font-semibold text-sm text-white">{post.author?.username}</span>
                    </div>

                    {/* Comments List */}
                    <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4">
                        {/* Caption as first comment */}
                        <div className="flex gap-3 group hover:bg-[#0a0a0a] p-2 rounded-lg transition-colors">
                            <img
                                src={post.author?.profileImg || defaultAvatar}
                                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                alt={post.author?.username}
                            />
                            <div className="text-sm">
                                <span className="font-semibold text-white">{post.author?.username}</span>
                                <p className="text-gray-200 mt-1">{post.caption}</p>
                            </div>
                        </div>

                        {comments.map((comment) => (
                            <div key={comment._id} className="flex gap-3 group hover:bg-[#0a0a0a] p-2 rounded-lg transition-colors">
                                <img
                                    src={comment.author?.profileImg || defaultAvatar}
                                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                    alt={comment.author.username}
                                />
                                <div className="text-sm">
                                    <span className="font-semibold text-white">{comment.author.username}</span>
                                    <p className="text-gray-200 mt-1">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer: Add Comment */}
                    <div className="p-4 border-t border-gray-800 flex items-center gap-3 bg-[#0a0a0a]">
                        <img
                            src={user?.profileImg || defaultAvatar}
                            className="w-8 h-8 rounded-full object-cover"
                            alt="Current user"
                        />
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addNewComment()}
                            className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder-gray-500"
                            placeholder="Add a comment..."
                        />
                        <button
                            onClick={addNewComment}
                            disabled={!value.trim()}
                            className={`font-semibold text-sm transition-all duration-200 ${value.trim() ? "text-[#0095f6] hover:text-white hover:scale-110" : "text-gray-600 cursor-default"}`}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
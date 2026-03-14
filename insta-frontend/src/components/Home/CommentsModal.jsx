import Modal from "react-modal";
import { UserCard } from "../commons/UserCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext, BASE_URL } from "../../contexts/AuthContext";


const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.65)",
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
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        minWidth: "600px",
        maxHeight: "80vh",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "12px",
        background: "#111",
        color: "#fff",
        padding: 0,
        overflow: "hidden",
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

    return (
        <Modal
            isOpen={open}
            onRequestClose={handleClose}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className="flex relative">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-white text-2xl z-10"
                >
                    ×
                </button>
                <img src={post.imageUrl} className="w-[500px] h-[520px] object-cover" />
                <div className="w-[350px] p-2 flex flex-col gap-2">
                    <UserCard
                        username={post.author.username}
                        profileImg="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <div className="flex flex-col gap-2 overflow-scroll h-[400px]">
                        {comments.map((comment) => (
                            <div key={comment._id} className="border-b border-white/20 pb-2">
                                <div className="font-semibold">{comment.author.username}</div>
                                <div className="text-sm">{comment.text}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center">
                        <textarea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="bg-[#111] w-full"
                            placeholder="Enter new comment"
                        ></textarea>
                        <button onClick={addNewComment} className="bg-blue-600 px-4 py-2 rounded text-white font-semibold">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
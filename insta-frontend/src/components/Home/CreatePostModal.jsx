
import { useState } from "react";
import Modal from "react-modal";
import { UserCard } from "../commons/UserCard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Posts } from "./Posts";
import { createPostApi, uploadFileApi } from "../../api/posts.api";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";

const BASE_URL = "http://127.0.0.1:4000";

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
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        minWidth: "600px",
        height: "520px",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #111 0%, #0a0a0a 100%)",
        color: "#fff",
        padding: 0,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
    },
};

export const CreatePostModal = ({ open, setOpen, setPosts, posts }) => {
    const { user } = useContext(AuthContext);
    const defaultAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [caption, setCaption] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    function handleFileChange(e) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        const url = URL.createObjectURL(uploadedFile);
        setPreviewUrl(url);
    }

    function handleClose() {
        setOpen(false);
        setFile(null);
        setCaption("");
        setPreviewUrl(null);
    }

    function handleDragOver(e) {
        e.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave() {
        setIsDragging(false);
    }

    function handleDrop(e) {
        e.preventDefault();
        setIsDragging(false);
        const uploadedFile = e.dataTransfer.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            const url = URL.createObjectURL(uploadedFile);
            setPreviewUrl(url);
        }
    }

    async function handleUpload() {
        if (!file) return null;
        try {
            const res = await uploadFileApi(file);
            return res.imageurl;
        } catch (err) {
            console.error("Upload failed:", err);
            alert(`Upload failed: ${err.response?.data?.message || err.message || 'Please try again'}`);
            throw err;
        }
    }

    async function onShare() {
        if (!file || !caption.trim()) {
            alert("Please select an image and add a caption");
            return;
        }

        try {
            const url = await handleUpload();
            const data = await createPostApi({ imageUrl: url, caption });
            if (setPosts && posts) {
                setPosts([data, ...posts]);
            }
            handleClose();
        }
        catch (err) {
            console.error("Error creating post:", err);
        }
    }

    return (
        <Modal isOpen={open} onRequestClose={handleClose} style={customStyles}>
            {!file ? (
                <div className="flex flex-col items-center justify-center h-full w-full relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-white hover:bg-gray-800 hover:scale-110 transition-all duration-200 rounded-full p-2"
                    >
                        <IoClose size={24} />
                    </button>

                    <div className="mb-4 text-center">
                        <div className="text-xl font-semibold mb-2">Create new post</div>
                        <div className="text-gray-400 text-sm">Share a photo with your followers</div>
                    </div>

                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative rounded-xl border-2 border-dashed transition-all duration-200 p-8 text-center ${isDragging
                            ? "border-[#0095f6] bg-[#0095f6]/10"
                            : "border-gray-600 hover:border-gray-400 hover:bg-[#0a0a0a]"
                            }`}
                    >
                        <IoCloudUploadOutline
                            size={64}
                            className={`mx-auto mb-4 transition-all duration-200 ${isDragging ? "text-[#0095f6] scale-110" : "text-gray-500"}`}
                        />
                        <div className="text-lg font-semibold mb-2">Drag photos and videos here</div>
                        <div className="text-gray-400 text-sm mb-4">or click to select from your computer</div>
                        <label className="px-6 py-3 bg-[#0095f6] hover:bg-[#0084e0] rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:scale-105 inline-block">
                            Select image
                            <input
                                onChange={handleFileChange}
                                className="hidden"
                                type="file"
                                accept="image/*"
                            />
                        </label>
                    </div>
                </div>
            ) : (
                <div className="flex h-full">
                    <div className="w-[500px] h-[520px] relative flex-shrink-0">
                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                        <button
                            onClick={() => {
                                setFile(null);
                                setPreviewUrl(null);
                            }}
                            className="absolute top-3 left-3 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                        >
                            <IoClose size={20} />
                        </button>
                    </div>
                    <div className="w-[400px] p-4 flex flex-col bg-black border-l border-gray-800 gap-4">
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold">Create new post</div>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>

                        <UserCard
                            username={user.username}
                            profileImg={user.profileImg || defaultAvatar}
                            caption={user.name || ""}
                        />

                        <div className="h-px bg-gray-800"></div>

                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                            maxLength="2200"
                            className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder-gray-500 resize-none focus:ring-2 focus:ring-[#0095f6]/30 rounded p-2 transition-all duration-200"
                        ></textarea>

                        <div className="text-xs text-gray-500 text-right">
                            {caption.length}/2200
                        </div>

                        <div className="h-px bg-gray-800"></div>

                        <button
                            onClick={onShare}
                            disabled={!caption.trim()}
                            className={`py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${caption.trim()
                                ? "bg-[#0095f6] text-white hover:bg-[#0084e0] hover:scale-105"
                                : "bg-gray-700 text-gray-500 cursor-default"
                                }`}
                        >
                            Share
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
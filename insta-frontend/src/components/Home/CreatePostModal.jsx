import { useState, useContext } from "react";
import Modal from "react-modal";
import { UserCard } from "../commons/UserCard";
import { AuthContext } from "../../contexts/AuthContext";
import { createPostApi, uploadFileApi } from "../../api/posts.api";
import {
    IoClose,
    IoCloudUploadOutline,
    IoImagesOutline,
} from "react-icons/io5";

const BASE_URL = "http://127.0.0.1:4000";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.78)",
        backdropFilter: "blur(12px)",
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
        width: "900px",
        maxWidth: "95vw",
        minWidth: "600px",
        height: "560px",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "22px",
        background: "#080a10",
        color: "#fff",
        padding: 0,
        overflow: "hidden",
        boxShadow:
            "0 30px 100px rgba(0,0,0,0.75), 0 0 80px rgba(59,130,246,0.08)",
    },
};

export const CreatePostModal = ({ open, setOpen, setPosts, posts }) => {
    const { user } = useContext(AuthContext);

    const defaultAvatar =
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [caption, setCaption] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    // AI loading state
    const [isGenerating, setIsGenerating] = useState(false);

    function handleFileChange(e) {
        const uploadedFile = e.target.files[0];

        if (!uploadedFile) return;

        setFile(uploadedFile);

        const url = URL.createObjectURL(uploadedFile);
        setPreviewUrl(url);
    }

    function handleClose() {
        setOpen(false);
        setFile(null);
        setCaption("");
        setPreviewUrl(null);
        setIsDragging(false);
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

    // ================= AI CAPTION GENERATOR =================

    async function generateCaption() {
        if (isGenerating) return;

        try {
            setIsGenerating(true);

            const response = await fetch(`${BASE_URL}/ai/caption`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt:
                        "Create a short, natural and Instagram-friendly caption for my post.",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate caption");
            }

            const data = await response.json();

            setCaption(data.caption || "");
        } catch (error) {
            console.error("AI caption error:", error);
            alert("Failed to generate caption. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    }

    async function handleUpload() {
        if (!file) return null;

        try {
            const res = await uploadFileApi(file);
            return res.imageurl;
        } catch (err) {
            console.error("Upload failed:", err);

            alert(
                `Upload failed: ${err.response?.data?.message ||
                err.message ||
                "Please try again"
                }`
            );

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

            const data = await createPostApi({
                imageUrl: url,
                caption,
            });

            if (setPosts && posts) {
                setPosts([data, ...posts]);
            }

            handleClose();
        } catch (err) {
            console.error("Error creating post:", err);
        }
    }

    return (
        <Modal
            isOpen={open}
            onRequestClose={handleClose}
            style={customStyles}
        >
            {!file ? (
                /* ================= UPLOAD SCREEN ================= */
                <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden bg-[#080a10]">

                    {/* Background Glow */}
                    <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

                    <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />

                    {/* Close */}
                    <button
                        onClick={handleClose}
                        className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200 hover:scale-105"
                    >
                        <IoClose size={23} />
                    </button>

                    {/* Heading */}
                    <div className="relative z-10 mb-7 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <IoImagesOutline
                                size={24}
                                className="text-blue-400"
                            />

                            <h2 className="text-xl font-semibold text-white">
                                Create new post
                            </h2>
                        </div>

                        <p className="text-sm text-gray-500">
                            Share a moment with your followers
                        </p>
                    </div>

                    {/* Upload Box */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
                            relative z-10 w-[480px] max-w-[85%]
                            rounded-2xl
                            border
                            border-dashed
                            p-10
                            text-center
                            transition-all
                            duration-300
                            ${isDragging
                                ? "border-blue-400 bg-blue-500/[0.08] shadow-[0_0_40px_rgba(59,130,246,0.12)] scale-[1.01]"
                                : "border-white/[0.12] bg-white/[0.025] hover:border-white/[0.22] hover:bg-white/[0.04]"
                            }
                        `}
                    >
                        {/* Upload Icon */}
                        <div
                            className={`
                                mx-auto mb-5
                                w-20 h-20
                                rounded-full
                                flex items-center justify-center
                                border
                                transition-all
                                duration-300
                                ${isDragging
                                    ? "border-blue-400/40 bg-blue-500/10 scale-110"
                                    : "border-white/[0.08] bg-white/[0.04]"
                                }
                            `}
                        >
                            <IoCloudUploadOutline
                                size={38}
                                className={
                                    isDragging
                                        ? "text-blue-400"
                                        : "text-gray-500"
                                }
                            />
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-2">
                            {isDragging
                                ? "Drop your image here"
                                : "Drag photos and videos here"}
                        </h3>

                        <p className="text-sm text-gray-500 mb-6">
                            or choose an image from your computer
                        </p>

                        {/* Select Button */}
                        <label className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold cursor-pointer shadow-[0_8px_25px_rgba(59,130,246,0.20)] hover:shadow-[0_10px_30px_rgba(59,130,246,0.30)] hover:scale-[1.03] active:scale-95 transition-all duration-200">
                            Select image

                            <input
                                onChange={handleFileChange}
                                className="hidden"
                                type="file"
                                accept="image/*"
                            />
                        </label>
                    </div>

                    <p className="relative z-10 text-[11px] text-gray-600 mt-5">
                        JPG, PNG and other image formats supported
                    </p>
                </div>
            ) : (
                /* ================= PREVIEW SCREEN ================= */
                <div className="flex h-full bg-[#080a10]">

                    {/* ================= IMAGE PREVIEW ================= */}
                    <div className="w-[560px] h-full relative flex-shrink-0 bg-black flex items-center justify-center overflow-hidden">

                        <img
                            src={previewUrl}
                            className="w-full h-full object-cover"
                            alt="Preview"
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />

                        {/* Change Image */}
                        <button
                            onClick={() => {
                                setFile(null);
                                setPreviewUrl(null);
                            }}
                            className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white px-3.5 py-2 rounded-xl border border-white/[0.10] text-xs font-medium transition-all duration-200 hover:scale-105"
                        >
                            <IoClose size={17} />
                            Change
                        </button>
                    </div>

                    {/* ================= RIGHT PANEL ================= */}
                    <div className="flex-1 min-w-0 p-5 flex flex-col bg-[#090b12] border-l border-white/[0.08]">

                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">

                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Create new post
                                </h2>

                                <p className="text-[11px] text-gray-500 mt-1">
                                    Add a caption to your post
                                </p>
                            </div>

                            <button
                                onClick={handleClose}
                                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all duration-200"
                            >
                                <IoClose size={21} />
                            </button>
                        </div>

                        {/* User */}
                        <div className="py-4">
                            <UserCard
                                username={user.username}
                                profileImg={
                                    user.profileImg || defaultAvatar
                                }
                                caption={user.name || ""}
                            />
                        </div>

                        {/* Caption */}
                        <div className="relative flex-1 rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">

                            {/* AI Caption Button */}
                            <button
                                type="button"
                                onClick={generateCaption}
                                disabled={isGenerating}
                                className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-medium hover:bg-purple-500/20 hover:border-purple-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating
                                    ? "✨ Generating..."
                                    : "✨ Generate Caption"}
                            </button>

                            <textarea
                                value={caption}
                                onChange={(e) =>
                                    setCaption(e.target.value)
                                }
                                placeholder="Write a caption..."
                                maxLength="2200"
                                className="w-full h-full bg-transparent border-none outline-none text-sm text-white placeholder-gray-600 resize-none p-4 pr-4 pt-14 focus:ring-0 leading-relaxed"
                            />

                            {/* Character Count */}
                            <div className="absolute bottom-3 right-3 text-[10px] text-gray-600">
                                {caption.length}/2200
                            </div>
                        </div>

                        {/* Share Button */}
                        <button
                            onClick={onShare}
                            disabled={!caption.trim()}
                            className={`
                                mt-4
                                w-full
                                py-3
                                rounded-xl
                                font-semibold
                                text-sm
                                transition-all
                                duration-200
                                ${caption.trim()
                                    ? "bg-blue-500 text-white hover:bg-blue-400 hover:shadow-[0_8px_25px_rgba(59,130,246,0.25)] hover:scale-[1.01] active:scale-[0.98]"
                                    : "bg-white/[0.06] text-gray-600 cursor-not-allowed"
                                }
                            `}
                        >
                            Share
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
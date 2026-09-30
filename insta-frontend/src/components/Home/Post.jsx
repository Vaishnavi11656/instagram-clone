
import { useState } from "react";
import { UserCard } from "../commons/UserCard";
import {
    IoHeartOutline,
    IoHeart,
    IoChatbubbleOutline,
    IoPaperPlaneOutline,
    IoBookmarkOutline,
    IoEllipsisHorizontal,
    IoTrash,
} from "react-icons/io5";
import { CommentModal } from "./CommentsModal";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { deletePostApi } from "../../api/posts.api";

export const Post = ({ post, toggleLike, onCommentAdd, onPostDelete }) => {
    const { user } = useContext(AuthContext);

    console.log("POST:", post);
    console.log("COMMENT COUNT:", post.commentCount);

    const defaultAvatar =
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";

    const [open, setOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showHeartAnimation, setShowHeartAnimation] = useState(false);

    // Check if the current user has already liked the post
    const isInitiallyLiked =
        post.likes?.includes(user?._id) ||
        post.likes?.includes(user?.username);

    const [liked, setLiked] = useState(isInitiallyLiked || false);

    const [localLikesCount, setLocalLikesCount] = useState(
        post.likes?.length || 0
    );

    // Check if current user is the post author
    const isPostAuthor =
        user?._id === post.author._id ||
        user?.username === post.author.username;

    // Sync local state if parent post prop updates
    useEffect(() => {
        setLiked(
            post.likes?.includes(user?._id) ||
                post.likes?.includes(user?.username) ||
                false
        );

        setLocalLikesCount(post.likes?.length || 0);
    }, [post.likes, user]);

    const handleLike = () => {
        const currentlyLiked = liked;

        setLiked(!currentlyLiked);

        setLocalLikesCount((prev) =>
            currentlyLiked ? Math.max(0, prev - 1) : prev + 1
        );

        toggleLike(post._id);
    };

    const handleDoubleTap = () => {
        if (!liked) {
            handleLike();
        }

        setShowHeartAnimation(true);

        setTimeout(() => setShowHeartAnimation(false), 1000);
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?"))
            return;

        setIsDeleting(true);

        try {
            await deletePostApi(post._id);

            setShowMenu(false);

            if (onPostDelete) onPostDelete(post._id);
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Failed to delete post");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            className="mb-10 max-w-[500px] mx-auto w-full group/post"
            key={post._id}
        >
            {/* Main Post Card */}
            <div className="bg-[#090b12]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-visible shadow-[0_15px_50px_rgba(0,0,0,0.45)] hover:border-white/[0.14] hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-300">

                {/* Header */}
                <div className="relative z-50 px-4 py-3.5 flex justify-between items-center border-b border-white/[0.06] bg-white/[0.015] rounded-t-2xl">

                    <UserCard
                        username={post.author.username}
                        profileImg={post.author.profileImg || defaultAvatar}
                        caption={post.author.name || ""}
                    />

                    {/* More Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                        >
                            <IoEllipsisHorizontal size={20} />
                        </button>

                        {/* Dropdown Menu */}
                        {showMenu && isPostAuthor && (
                            <div className="absolute right-0 top-11 bg-[#11141c] border border-white/[0.1] rounded-xl shadow-2xl z-50 min-w-[165px] overflow-hidden animate-in fade-in zoom-in duration-200">

                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="w-full px-4 py-3.5 text-left flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-all duration-200 disabled:opacity-50"
                                >
                                    <IoTrash size={18} />

                                    <span className="text-sm font-medium">
                                        {isDeleting
                                            ? "Deleting..."
                                            : "Delete Post"}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Image */}
                <div
                    className="relative z-0 aspect-square overflow-hidden bg-black group/img cursor-pointer flex items-center justify-center"
                    onDoubleClick={handleDoubleTap}
                >
                    <img
                        className="w-full h-full object-cover group-hover/img:scale-[1.025] transition-transform duration-700 ease-out"
                        src={post.imageUrl}
                        alt={post.caption}
                    />

                    {/* Image bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Double Tap Heart */}
                    {showHeartAnimation && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <IoHeart
                                size={100}
                                className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.7)] animate-ping opacity-75"
                            />

                            <IoHeart
                                size={80}
                                className="text-white drop-shadow-2xl absolute animate-bounce"
                            />
                        </div>
                    )}
                </div>

                {/* Interaction Section */}
                <div className="px-4 pt-4 pb-5 bg-[#090b12] rounded-b-2xl">

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mb-4">

                        <div className="flex items-center gap-2">

                            {/* Like */}
                            <button
                                onClick={handleLike}
                                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-red-500/[0.08] hover:scale-110 active:scale-90 transition-all duration-200"
                            >
                                {liked ? (
                                    <IoHeart
                                        size={28}
                                        className="text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.55)]"
                                    />
                                ) : (
                                    <IoHeartOutline
                                        size={28}
                                        className="text-gray-200 hover:text-red-400 transition-colors"
                                    />
                                )}
                            </button>

                            {/* Comment */}
                            <button
                                onClick={() => setOpen(true)}
                                className="h-11 px-3 flex items-center gap-2 rounded-full hover:bg-blue-500/[0.08] hover:scale-105 active:scale-90 transition-all duration-200"
                            >
                                <IoChatbubbleOutline
                                    size={26}
                                    className="text-gray-200 hover:text-blue-400 transition-colors"
                                />

                                <span className="text-sm font-semibold text-gray-300">
                                    {post.commentCount || 0}
                                </span>
                            </button>

                            {/* Share */}
                            <button
                                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-purple-500/[0.08] hover:scale-110 active:scale-90 transition-all duration-200"
                            >
                                <IoPaperPlaneOutline
                                    size={26}
                                    className="text-gray-200 hover:text-purple-400 transition-colors"
                                />
                            </button>
                        </div>

                        {/* Bookmark */}
                        <button
                            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-yellow-500/[0.08] hover:scale-110 active:scale-90 transition-all duration-200"
                        >
                            <IoBookmarkOutline
                                size={26}
                                className="text-gray-200 hover:text-yellow-400 transition-colors"
                            />
                        </button>
                    </div>

                    {/* Likes */}
                    <div className="mb-2.5 font-semibold text-sm text-white">
                        {localLikesCount === 1
                            ? "1 like"
                            : `${ localLikesCount.toLocaleString() } likes`}
                    </div>

                    {/* Caption */}
                    <div className="mb-3 text-[14px] leading-relaxed">
                        <span className="font-bold text-white hover:underline underline-offset-2 cursor-pointer">
                            {post.author.username}
                        </span>

                        {post.caption && (
                            <span className="text-gray-300 ml-2">
                                {post.caption}
                            </span>
                        )}
                    </div>

                    {/* Comments */}
                    <div className="mb-3">
                        {post.commentCount > 0 ? (
                            <button
                                onClick={() => setOpen(true)}
                                className="text-[13px] text-gray-500 hover:text-gray-200 transition-colors"
                            >
                                View all {post.commentCount}{" "}
                                {post.commentCount === 1
                                    ? "comment"
                                    : "comments"}
                            </button>
                        ) : (
                            <button
                                onClick={() => setOpen(true)}
                                className="text-[13px] text-gray-600 hover:text-gray-400 transition-colors italic"
                            >
                                Be the first to comment...
                            </button>
                        )}
                    </div>

                    {/* Comment Input */}
                    <div
                        className="flex items-center gap-3 pt-3.5 border-t border-white/[0.06] cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <img
                            src={user?.profileImg || defaultAvatar}
                            className="w-7 h-7 rounded-full object-cover border border-white/[0.12]"
                            alt={user?.username}
                        />

                        <span className="text-sm text-gray-500 flex-1">
                            Add a comment...
                        </span>

                        <span className="text-blue-400 text-xs font-semibold opacity-0 group-hover/post:opacity-100 transition-opacity">
                            Post
                        </span>
                    </div>
                </div>
            </div>

            {/* Comment Modal */}
            {open && (
                <CommentModal
                    open={open}
                    setOpen={setOpen}
                    post={post}
                    onCommentAdd={onCommentAdd}
                />
            )}
        </div>
    );
};



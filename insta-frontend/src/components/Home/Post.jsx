import { useState } from "react";
import { UserCard } from "../commons/UserCard";
import { IoHeartOutline, IoHeart, IoChatbubbleOutline, IoPaperPlaneOutline, IoBookmarkOutline, IoEllipsisHorizontal, IoTrash } from "react-icons/io5";
import { CommentModal } from "./CommentsModal";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { deletePostApi } from "../../api/posts.api";

export const Post = ({ post, toggleLike, onCommentAdd, onPostDelete }) => {
    const { user } = useContext(AuthContext);
    const defaultAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";
    const [open, setOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Check if the current user has already liked the post
    const isInitiallyLiked = post.likes?.includes(user?._id) || post.likes?.includes(user?.username);
    const [liked, setLiked] = useState(isInitiallyLiked || false);
    const [localLikesCount, setLocalLikesCount] = useState(post.likes?.length || 0);

    // Check if current user is the post author
    const isPostAuthor = user?._id === post.author._id || user?.username === post.author.username;

    // Sync local state if parent post prop updates (e.g. from network)
    useEffect(() => {
        setLiked(post.likes?.includes(user?._id) || post.likes?.includes(user?.username) || false);
        setLocalLikesCount(post.likes?.length || 0);
    }, [post.likes, user]);

    const handleLike = () => {
        const currentlyLiked = liked;
        setLiked(!currentlyLiked);
        setLocalLikesCount(prev => currentlyLiked ? Math.max(0, prev - 1) : prev + 1);
        toggleLike(post._id);
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

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
        <div className="mb-6 bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl max-w-[600px]" key={post._id}>
            {/* Header with user info and menu */}
            <div className="p-4 flex justify-between items-center border-b border-gray-800">
                <UserCard
                    username={post.author.username}
                    profileImg={post.author.profileImg || defaultAvatar}
                    caption={post.author.name || ""}
                />
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 hover:bg-gray-900 rounded-full transition-all duration-200"
                    >
                        <IoEllipsisHorizontal size={20} className="text-gray-300 hover:text-white" />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && isPostAuthor && (
                        <div className="absolute right-0 top-10 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 min-w-[150px] overflow-hidden">
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 text-red-500 hover:bg-red-500/10 transition-colors duration-200 disabled:opacity-50 border-b border-gray-800 last:border-b-0"
                            >
                                <IoTrash size={18} />
                                {isDeleting ? "Deleting..." : "Delete Post"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Image - Full Width */}
            <div className="relative aspect-square overflow-hidden bg-black group">
                <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={post.imageUrl}
                    alt={post.caption}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Interaction Section */}
            <div className="p-4">
                {/* Like, Comment, Share, Bookmark Buttons */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4">
                        <button
                            onClick={handleLike}
                            className="p-2 hover:bg-gray-900 rounded-full transition-all duration-200 group/btn"
                        >
                            {liked ? (
                                <IoHeart size={24} className="text-red-500 group-hover/btn:scale-110 transition-transform" />
                            ) : (
                                <IoHeartOutline size={24} className="text-gray-300 group-hover/btn:text-white group-hover/btn:scale-110 transition-all" />
                            )}
                        </button>
                        <button
                            onClick={() => setOpen(true)}
                            className="p-2 hover:bg-gray-900 rounded-full transition-all duration-200 group/btn"
                        >
                            <IoChatbubbleOutline size={24} className="text-gray-300 group-hover/btn:text-white group-hover/btn:scale-110 transition-all" />
                        </button>
                        <button className="p-2 hover:bg-gray-900 rounded-full transition-all duration-200 group/btn">
                            <IoPaperPlaneOutline size={24} className="text-gray-300 group-hover/btn:text-white group-hover/btn:scale-110 transition-all" />
                        </button>
                    </div>
                    <button className="p-2 hover:bg-gray-900 rounded-full transition-all duration-200 group/btn">
                        <IoBookmarkOutline size={24} className="text-gray-300 group-hover/btn:text-white group-hover/btn:scale-110 transition-all" />
                    </button>
                </div>

                {/* Likes Count */}
                <div className="mb-3 font-bold text-sm text-white">
                    {localLikesCount === 1 ? "1 like" : `${localLikesCount} likes`}
                </div>

                {/* Caption */}
                <div className="mb-3 text-sm">
                    <span className="font-bold text-white">{post.author.username}</span>
                    {post.caption && (
                        <span className="text-gray-300 ml-2">{post.caption}</span>
                    )}
                </div>

                {/* Comments Section */}
                {post.commentCount > 0 ? (
                    <button
                        onClick={() => setOpen(true)}
                        className="text-sm text-gray-400 hover:text-gray-200 transition-colors mb-3 block"
                    >
                        View all {post.commentCount} {post.commentCount === 1 ? "comment" : "comments"}
                    </button>
                ) : (
                    <button
                        onClick={() => setOpen(true)}
                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors mb-3 block"
                    >
                        Be the first to comment...
                    </button>
                )}

                {/* Comment Input */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                    <img
                        src={user?.profileImg || defaultAvatar}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        alt={user?.username}
                    />
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder-gray-500 cursor-text"
                        onClick={() => setOpen(true)}
                        readOnly
                    />
                </div>
            </div>

            {/* Comment Modal */}
            {open && <CommentModal open={open} setOpen={setOpen} post={post} onCommentAdd={onCommentAdd} />}
        </div>
    );
};


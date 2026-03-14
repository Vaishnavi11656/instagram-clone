import { useState } from "react";
import { UserCard } from "../commons/UserCard";
import { FaRegHeart } from "react-icons/fa";
import { SiTheconversation } from "react-icons/si";
import { CommentModal } from "./CommentsModal";

export const Post = ({ post, toggleLike, onCommentAdd }) => {
    const [open, setOpen] = useState(false);
    console.log("Post component rendered", post.commentCount);

    return (
        <div className="flex flex-col gap-2" key={post._id}>
            <div>
                <UserCard
                    username={post.author.username}
                    profileImg="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </div>
            <img className="rounded" src={post.imageUrl} />
            <div className="flex gap-4">
                <span className="flex gap-1 items-center">
                    <FaRegHeart size={20} onClick={() => toggleLike(post._id)} />
                    {post.likes.length > 0 && post.likes.length}
                </span>
                <span className="flex gap-1 items-center">
                    <SiTheconversation size={20} onClick={() => setOpen(true)} />
                    {post.commentCount > 0 && post.commentCount}
                </span>
            </div>
            <div className="flex gap-2">
                <span className="font-semibold">{post.author.username}</span>
                <span>{post.caption}</span>
            </div>
            {open && <CommentModal open={open} setOpen={setOpen} post={post} onCommentAdd={onCommentAdd} />}
        </div>
    );
};


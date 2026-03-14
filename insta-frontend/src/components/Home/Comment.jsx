import { UserCard } from "../commons/UserCard";

export const Comment = ({ comment }) => {
    return (
        <div className="flex gap-2 items-center text-sm">
            <UserCard
                username={comment.author?.username}
                profileImg="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            {comment.text}
        </div>
    );
};
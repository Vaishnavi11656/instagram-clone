import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Post } from "./Post";
import { getPostsApi } from "../../api/posts.api";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";


export const Posts = ({ posts, setPosts }) => {
  const { user } = useContext(AuthContext);

  async function toggleLike(postId) {
    const res = await fetch(`${BASE_URL}/posts/like/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const savedPost = await res.json();
    setPosts(
      posts.map((p) => {
        if (p._id === postId) {
          return savedPost;
        }
        return p;
      }),
    );
  }

  function handleCommentAdd(postId) {
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p._id === postId) {
          return {
            ...p,
            commentCount: (p.commentCount || 0) + 1,
          };
        }

        return p;
      })
    );
  }

  function handlePostDelete(postId) {
    setPosts(posts.filter((p) => p._id !== postId));
  }

  useEffect(() => {
    async function loadPosts() {
      //   const res = await fetch(`${BASE_URL}/posts`, {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const data = await res.json();
      const data = await getPostsApi();
      setPosts(data);
    }

    try {
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  }, [user, setPosts]);

  return (
    <div className="flex flex-col gap-6 w-[600px] text-sm">
      {posts.map((post) => {
        return (
          <Post
            key={post._id}
            post={post}
            toggleLike={toggleLike}
            onCommentAdd={handleCommentAdd}
            onPostDelete={handlePostDelete}
          />
        );
      })}
    </div>
  );
};

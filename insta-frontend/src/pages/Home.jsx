import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Feed } from "../components/Home/Feed";
import { RightNav } from "../components/Home/RightNav";

export const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  return (
    <div className="flex w-full justify-center max-w-[1000px] mx-auto gap-8 pt-8">
      <Feed posts={posts} setPosts={setPosts} />
      <RightNav />
    </div>
  );
};

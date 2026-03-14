import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { LeftNav } from "../components/Home/LeftNav";
import { Feed } from "../components/Home/Feed";
import { RightNav } from "../components/Home/RightNav";

export const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex w-full justify-between">
      <LeftNav posts={posts} setPosts={setPosts} />
      <Feed posts={posts} setPosts={setPosts} />
      <RightNav />

    </div>
  );
};

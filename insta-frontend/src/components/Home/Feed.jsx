import { Posts } from "./Posts";
import { StatusBar } from "./StatusBar";

export const Feed = ({ posts, setPosts }) => {
  return (
    <div className="flex flex-col gap-6 mt-4 items-center">
      <StatusBar />
      <Posts posts={posts} setPosts={setPosts} />
    </div>
  );
};

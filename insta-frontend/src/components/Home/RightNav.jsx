import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserCard } from "../commons/UserCard";

const dummyUsers = [
  {
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "martha_maggi",
    showFollowing: true,
  },
  {
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "maddy",
    showFollowing: true,
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1681489930334-b0d26fdb9ed8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "suzain",
    showFollowing: true,
  },
  {
    img: "https://images.unsplash.com/photo-1722322426803-101270837197?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "marauders_map",
    showFollowing: true,
  },
  {
    img: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "magic_mike",
    showFollowing: true,
  },
  {
    img: "https://images.unsplash.com/photo-1558203728-00f45181dd84?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "rugby",
    showFollowing: true,
  },
];

export const RightNav = () => {
  const { user } = useContext(AuthContext);
  const defaultAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";

  return (
    <div className="w-[319px] flex flex-col gap-6 mt-8 mr-4 hidden lg:flex sticky top-8 h-fit">
      <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-xl p-4 border border-gray-800">
        <UserCard
          username={user.username}
          profileImg={user.profileImg || defaultAvatar}
          caption={user.name}
          rightElem={<span className="text-[12px] font-semibold text-[#0095f6] hover:text-white cursor-pointer transition-all duration-200 hover:scale-105">Switch</span>}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-2 py-1">
          <span className="text-[14px] font-semibold text-gray-300">Suggested for you</span>
          <span className="text-[12px] font-semibold text-[#0095f6] hover:text-white cursor-pointer transition-all duration-200 hover:scale-105">See All</span>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {dummyUsers.map((user) => (
            <div
              key={user.username}
              className="bg-gradient-to-r from-[#111]/50 to-[#0a0a0a]/50 rounded-lg p-2 border border-gray-800/50 hover:border-gray-700 hover:bg-gradient-to-r hover:from-[#111] hover:to-[#0a0a0a] transition-all duration-200"
            >
              <UserCard
                username={user.username}
                profileImg={user.img}
                caption="Following by you"
                rightElem={
                  <span className="text-[12px] font-semibold text-[#0095f6] hover:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                    Follow
                  </span>
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 px-2">
        <div className="flex flex-wrap gap-x-2 gap-y-2 text-[11px] text-gray-500">
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">About</span>
          <span>•</span>
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">Help</span>
          <span>•</span>
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">Press</span>
          <span>•</span>
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">API</span>
          <span>•</span>
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">Jobs</span>
          <span>•</span>
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">Privacy</span>
          <span>•</span>
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">Terms</span>
          <span>•</span>
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">Locations</span>
          <span>•</span>
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">Language</span>
        </div>
        <div className="text-xs text-gray-600 mt-4">© 2024 Instagram Clone <br /> Made with ❤️</div>
      </div>
    </div>
  );
};

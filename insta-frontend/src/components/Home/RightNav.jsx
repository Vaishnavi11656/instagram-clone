
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
    img: "https://images.unsplash.com/photo-1722322426803-101270837197?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1nfGVufDB8fHx8fA%3D%3D",
    username: "marauders_map",
    showFollowing: true,
  },
  {
    img: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1nfGVufDB8fHx8fA%3D%3D",
    username: "magic_mike",
    showFollowing: true,
  },
  {
    img: "https://images.unsplash.com/photo-1558203728-00f45181dd84?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fHx8fHx8fA%3D%3D",
    username: "rugby",
    showFollowing: true,
  },
];

export const RightNav = () => {
  const { user } = useContext(AuthContext);

  const defaultAvatar =
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";

  return (
    <div className="w-[330px] flex flex-col gap-5 mt-8 mr-5 hidden lg:flex sticky top-8 h-fit">

      {/* ================= CURRENT USER ================= */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090b12]/90 backdrop-blur-xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">

        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <UserCard
            username={user.username}
            profileImg={user.profileImg || defaultAvatar}
            caption={user.name}
            rightElem={
              <span className="text-[12px] font-semibold text-blue-400 hover:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                Switch
              </span>
            }
          />
        </div>
      </div>

      {/* ================= SUGGESTIONS ================= */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090b12]/75 backdrop-blur-xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.30)]">

        {/* Header */}
        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-[14px] font-semibold text-gray-400">
            Suggested for you
          </span>

          <span className="text-[12px] font-semibold text-blue-400 hover:text-white cursor-pointer transition-colors duration-200">
            See All
          </span>
        </div>

        {/* Users */}
        <div className="flex flex-col gap-1">

          {dummyUsers.map((user, index) => (
            <div
              key={user.username}
              className="group relative flex items-center rounded-xl px-2.5 py-2.5 hover:bg-white/[0.04] transition-all duration-200"
            >

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/[0.04] to-purple-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10 w-full">
                <UserCard
                  username={user.username}
                  profileImg={user.img}
                  caption="Following by you"
                  rightElem={
                    <span className="text-[12px] font-semibold text-blue-400 hover:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                      Follow
                    </span>
                  }
                />
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="px-2 pt-1">

        <div className="flex flex-wrap gap-x-2 gap-y-2 text-[11px] text-gray-600 leading-relaxed">
          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">
            About
          </span>
          <span>•</span>

          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">
            Help
          </span>
          <span>•</span>

          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">
            Press
          </span>
          <span>•</span>

          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">
            API
          </span>
          <span>•</span>

          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">
            Jobs
          </span>
          <span>•</span>

          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">
            Privacy
          </span>
          <span>•</span>

          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">
            Terms
          </span>
          <span>•</span>

          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">
            Locations
          </span>
          <span>•</span>

          <span className="hover:text-gray-400 hover:underline cursor-pointer transition-colors">
            Language
          </span>
        </div>

        <div className="text-[11px] text-gray-600 mt-4">
          © 2024 Instagram Clone
          <br />
          Made with ❤️
        </div>

      </div>
    </div>
  );
};



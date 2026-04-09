import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { BsPlayBtn } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CgDetailsMore } from "react-icons/cg";
import { FaBoxesStacked } from "react-icons/fa6";
import { CreatePostModal } from "./CreatePostModal";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LogoutMenu } from "./LogoutMenu";
import { useNavigate, useLocation } from "react-router-dom";

export const LeftNav = ({ posts, setPosts }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const defaultAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItem = (icon, label, path, badge = null) => (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center gap-4 cursor-pointer hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#0a0a0a] p-3 rounded-xl transition-all duration-200 group w-full ${isActive(path) ? "bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a]" : ""
        }`}
    >
      <div className="relative">
        {icon}
        {badge && (
          <div className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-black shadow-lg">
            {badge}
          </div>
        )}
      </div>
      <div className="group-hover:text-white transition-colors">{label}</div>
    </button>
  );

  return (
    <div className="sticky top-0 w-64 flex-shrink-0 flex flex-col justify-between align-start border-r border-gray-700 pl-6 h-screen pb-4 bg-gradient-to-b from-black via-black to-[#0a0a0a] z-50">
      <div className="mt-8 mb-4 px-2">
        <div className="text-[24px] font-bold tracking-tight mb-8 px-3 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent" style={{ fontFamily: "'Comfortaa', cursive" }}>
          Instagram
        </div>
        <div className="flex flex-col gap-2 text-lg font-semibold">
          {navItem(<GoHomeFill size={28} className="group-hover:scale-110 group-hover:text-blue-400 transition-all duration-200" />, "Home", "/")}
          {navItem(<IoSearch size={28} className="group-hover:scale-110 group-hover:text-blue-400 transition-all duration-200" />, "Search", "/explore")}
          {navItem(<MdOutlineExplore size={28} className="group-hover:scale-110 group-hover:text-blue-400 transition-all duration-200" />, "Explore", "/explore")}
          {navItem(<BsPlayBtn size={28} className="group-hover:scale-110 group-hover:text-blue-400 transition-all duration-200" />, "Reels", null)}
          {navItem(<MdOutlineMessage size={28} className="group-hover:scale-110 group-hover:text-blue-400 transition-all duration-200" />, "Messages", "/messages", "3")}
          {navItem(<CiHeart size={28} className="group-hover:scale-110 group-hover:text-red-400 transition-all duration-200" />, "Notifications", "/notifications", "2")}

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-4 cursor-pointer hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#0a0a0a] p-3 rounded-xl transition-all duration-200 group bg-gradient-to-r from-blue-600/0 to-blue-600/0 hover:from-blue-600/10 hover:to-blue-600/0 w-full"
          >
            <FaPlus size={28} className="group-hover:scale-110 group-hover:text-blue-400 transition-all duration-200" />
            <div className="group-hover:text-white transition-colors">Create</div>
          </button>

          <button
            onClick={() => navigate(`/profile/${user?._id}`)}
            className={`flex items-center gap-4 cursor-pointer hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#0a0a0a] p-3 rounded-xl transition-all duration-200 group w-full ${isActive(`/profile/${user?._id}`) ? "bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a]" : ""
              }`}
          >
            <img
              src={user?.profileImg || defaultAvatar}
              className="w-7 h-7 rounded-full object-cover group-hover:scale-110 transition-all duration-200 border border-gray-600 group-hover:border-blue-400"
              alt="Profile"
            />
            <div className="group-hover:text-white transition-colors">Profile</div>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-lg font-semibold relative">
        <div
          onClick={() => setLogoutOpen(!logoutOpen)}
          className="flex items-center gap-4 cursor-pointer hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#0a0a0a] p-3 rounded-xl transition-all duration-200 group w-full"
        >
          <CgDetailsMore size={28} className="group-hover:scale-110 transition-all duration-200" />
          <div className="group-hover:text-white transition-colors">More</div>
        </div>
        <LogoutMenu isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />
        <div className="flex items-center gap-4 cursor-pointer hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#0a0a0a] p-3 rounded-xl transition-all duration-200 group">
          <FaBoxesStacked size={28} className="group-hover:scale-110 transition-all duration-200" />
          <div className="group-hover:text-white transition-colors">Also from Meta</div>
        </div>
      </div>
      <CreatePostModal open={open} setOpen={setOpen} setPosts={setPosts} posts={posts} />
    </div>
  );
};

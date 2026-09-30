
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { BsPlayBtn } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaBoxesStacked } from "react-icons/fa6";
import { CgDetailsMore } from "react-icons/cg";

import { CreatePostModal } from "./CreatePostModal";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LogoutMenu } from "./LogoutMenu";
import { useNavigate, useLocation } from "react-router-dom";

export const LeftNav = ({ posts, setPosts }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const defaultAvatar =
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";

  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItem = (icon, label, path, badge = null) => (
    <button
      onClick={() => path && navigate(path)}
      className={`relative flex items-center gap-5 w-full px-5 py-4 rounded-2xl cursor-pointer
        transition-all duration-300 group
        ${
          isActive(path)
            ? "bg-white/[0.10] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
            : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
        }`}
    >
      {/* Active indicator */}
      {isActive(path) && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-8 rounded-r-full bg-gradient-to-b from-blue-400 via-purple-500 to-fuchsia-500 shadow-[0_0_14px_rgba(96,165,250,0.9)]" />
      )}

      {/* Icon */}
      <div
        className={`relative flex items-center justify-center transition-all duration-300
          ${
            isActive(path)
              ? "text-white scale-105"
              : "text-gray-400 group-hover:text-blue-400 group-hover:scale-110"
          }`}
      >
        {icon}

        {/* Notification badge */}
        {badge && (
          <div className="absolute -top-2.5 -right-2.5 min-w-[19px] h-[19px] px-1 bg-gradient-to-br from-red-500 to-pink-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#07080d] shadow-[0_0_12px_rgba(239,68,68,0.5)]">
            {badge}
          </div>
        )}
      </div>

      {/* Label */}
      <span
        className={`text-[17px] transition-all duration-300 ${
          isActive(path)
            ? "font-semibold text-white"
            : "font-medium text-gray-400 group-hover:text-white"
        }`}
      >
        {label}
      </span>
    </button>
  );

  return (
    <aside className="sticky top-0 w-80 flex-shrink-0 h-screen z-50">
      <div
        className="
          relative
          h-full
          flex
          flex-col
          justify-between
          px-5
          py-7
          border-r
          border-white/[0.08]
          bg-[#07080d]/95
          backdrop-blur-2xl
          shadow-[10px_0_40px_rgba(0,0,0,0.30)]
          overflow-visible
        "
      >
        {/* Subtle top glow */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-500/[0.07] via-purple-500/[0.02] to-transparent pointer-events-none" />

        {/* ============================= */}
        {/* LOGO + MAIN NAVIGATION */}
        {/* ============================= */}

        <div className="relative">
          {/* Logo */}
          <div
            className="
              px-5
              mb-10
              text-[30px]
              font-bold
              tracking-tight
              select-none
            "
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-300 bg-clip-text text-transparent">
              Instagram
            </span>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2 text-[18px]">
            {/* Home */}
            {navItem(
              <GoHomeFill size={30} />,
              "Home",
              "/"
            )}

            {/* Search */}
            {navItem(
              <IoSearch size={30} />,
              "Search",
              "/explore"
            )}

            {/* Explore */}
            {navItem(
              <MdOutlineExplore size={30} />,
              "Explore",
              "/explore"
            )}

            {/* Reels */}
            {navItem(
              <BsPlayBtn size={28} />,
              "Reels",
              null
            )}

            {/* Messages */}
            {navItem(
              <MdOutlineMessage size={30} />,
              "Messages",
              "/messages",
              "3"
            )}

            {/* Notifications */}
            {navItem(
              <CiHeart size={32} />,
              "Notifications",
              "/notifications",
              "2"
            )}

            {/* Create */}
            <button
              onClick={() => setOpen(true)}
              className="
                relative
                flex
                items-center
                gap-5
                w-full
                px-5
                py-4
                rounded-2xl
                cursor-pointer
                text-gray-400
                hover:text-white
                hover:bg-white/[0.06]
                transition-all
                duration-300
                group
              "
            >
              <div className="flex items-center justify-center text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300">
                <FaPlus size={29} />
              </div>

              <span className="text-[17px] font-medium group-hover:text-white transition-colors">
                Create
              </span>
            </button>

            {/* Profile */}
            <button
              onClick={() => navigate(`/profile/${user?._id}`)}
              className={`
                relative
                flex
                items-center
                gap-5
                w-full
                px-5
                py-4
                rounded-2xl
                cursor-pointer
                transition-all
                duration-300
                group
                ${
                  isActive(`/profile/${user?._id}`)
                    ? "bg-white/[0.10] text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
                }
              `}
            >
              {/* Profile active indicator */}
              {isActive(`/profile/${user?._id}`) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-8 rounded-r-full bg-gradient-to-b from-blue-400 to-purple-500 shadow-[0_0_14px_rgba(96,165,250,0.8)]" />
              )}

              <img
                src={user?.profileImg || defaultAvatar}
                alt="Profile"
                style={{
                  width: "32px",
                  height: "32px",
                  minWidth: "32px",
                  minHeight: "32px",
                  maxWidth: "32px",
                  maxHeight: "32px",
                }}
                className={`
                  rounded-full
                  object-cover
                  transition-all
                  duration-300
                  ${
                    isActive(`/profile/${user?._id}`)
                      ? "ring-2 ring-blue-400/80"
                      : "border border-white/20 group-hover:border-blue-400 group-hover:scale-110"
                  }
                `}
              />

              <span
                className={`text-[17px] font-medium ${
                  isActive(`/profile/${user?._id}`)
                    ? "text-white"
                    : "group-hover:text-white"
                }`}
              >
                Profile
              </span>
            </button>
          </div>
        </div>

        {/* ============================= */}
        {/* BOTTOM NAVIGATION */}
        {/* ============================= */}

        <div className="relative flex flex-col gap-2 text-[18px] font-medium mt-8">

          {/* More */}
          <div
            onClick={() => setLogoutOpen(!logoutOpen)}
            className="
              relative
              flex
              items-center
              gap-5
              w-full
              px-5
              py-4
              rounded-2xl
              cursor-pointer
              text-gray-400
              hover:text-white
              hover:bg-white/[0.06]
              transition-all
              duration-300
              group
            "
          >
            <CgDetailsMore
              size={30}
              className="text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300"
            />

            <span className="text-[17px] group-hover:text-white transition-colors">
              More
            </span>
          </div>

          {/* Logout menu */}
          <LogoutMenu
            isOpen={logoutOpen}
            onClose={() => setLogoutOpen(false)}
          />

          {/* Also from Meta */}
          <div
            className="
              flex
              items-center
              gap-5
              w-full
              px-5
              py-4
              rounded-2xl
              cursor-pointer
              text-gray-400
              hover:text-white
              hover:bg-white/[0.06]
              transition-all
              duration-300
              group
            "
          >
            <FaBoxesStacked
              size={29}
              className="text-gray-400 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300"
            />

            <span className="text-[17px] group-hover:text-white transition-colors">
              Also from Meta
            </span>
          </div>
        </div>

        {/* ============================= */}
        {/* CREATE POST MODAL */}
        {/* ============================= */}

        <CreatePostModal
          open={open}
          setOpen={setOpen}
          setPosts={setPosts}
          posts={posts}
        />
      </div>
    </aside>
  );
};


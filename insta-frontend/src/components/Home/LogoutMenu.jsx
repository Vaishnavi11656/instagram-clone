import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { HiOutlineSun } from "react-icons/hi";

export const LogoutMenu = ({ isOpen, onClose }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: <IoSettingsOutline size={22} />, label: "Settings" },
    { icon: <BsClockHistory size={22} />, label: "Your activity" },
    { icon: <CiBookmark size={22} />, label: "Saved" },
    { 
      icon: <HiOutlineSun size={22} />, 
      label: "Switch appearance",
      onClick: () => {
        document.body.classList.toggle('light-theme');
        onClose();
      }
    },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/5" 
        onClick={onClose}
      />
      <div className="absolute bottom-[4.5rem] left-0 w-[266px] bg-[#262626] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-50 overflow-hidden transform transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] animate-in slide-in-from-bottom-5 fade-in backdrop-blur-xl bg-opacity-95 border border-[#363636]">
        <div className="flex flex-col p-1.5 capita">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-3.5 px-4 py-3 hover:bg-[#3c3c3c] rounded-lg cursor-pointer transition-all duration-200 group active:opacity-70"
            >
              <div className="text-white group-hover:scale-105 transition-transform duration-200">
                {item.icon}
              </div>
              <span className="text-[14px] text-[#f5f5f5] font-normal leading-tight">{item.label}</span>
            </div>
          ))}
          
          <div className="h-[6px] bg-[#363636] my-1.5 -mx-1.5 opacity-20" />
          
          <div 
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-4 py-3 hover:bg-[#3c3c3c] rounded-lg cursor-pointer transition-all duration-200 text-red-500 group active:opacity-70"
          >
            <div className="group-hover:scale-105 transition-transform duration-200">
              <MdLogout size={22} />
            </div>
            <span className="text-[14px] font-semibold leading-tight">Log out</span>
          </div>
        </div>
      </div>
    </>
  );
};

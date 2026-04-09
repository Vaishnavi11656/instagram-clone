export const UserCard = ({ username, profileImg, rightElem, caption }) => {
  return (
    <div className="flex justify-between items-center p-2 rounded-xl hover:bg-[#1a1a1a] transition-all duration-200 group cursor-pointer">
      <div className="flex gap-3 items-center">
        <div className="relative">
          <img className="h-11 w-11 object-cover rounded-full border border-gray-800 p-[1px] group-hover:scale-105 transition-transform" src={profileImg} />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-[14px] text-white leading-tight">{username}</div>
          <div className="text-[12px] text-gray-400 group-hover:text-gray-300 transition-colors">{caption}</div>
        </div>
      </div>
      <div className="group-hover:scale-105 transition-transform">{rightElem}</div>
    </div>
  );
};

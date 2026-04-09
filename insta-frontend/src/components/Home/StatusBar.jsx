import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const stories = [

    {
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Maggie",
        id: 1,
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Steve",
        id: 2,
    },
    {
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Stephenie",
        id: 3,
    },
    {
        img: "https://images.unsplash.com/photo-1698510047345-ff32de8a3b74?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "John",
        id: 4,
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Richard",
        id: 5,
    },
    {
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Hannah",
        id: 6,
    },
    {
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Maggie",
        id: 7,
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Steve",
        id: 8,
    },
    {
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Stephenie",
        id: 9,
    },
    {
        img: "https://images.unsplash.com/photo-1698510047345-ff32de8a3b74?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "John",
        id: 10,
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Richard",
        id: 11,
    },
    {
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Hannah",
        id: 12,
    },
];

export const StatusBar = () => {
    const { user } = useContext(AuthContext);
    const defaultAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";

    return (
        <div className="flex gap-4 w-[630px] overflow-x-auto no-scrollbar py-4 px-2 bg-gradient-to-b from-black via-[#0a0a0a] to-black rounded-lg">
            <div className="flex flex-col gap-1.5 flex-shrink-0 items-center cursor-pointer group active:scale-95 transition-transform duration-150">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -m-1"></div>
                    <img
                        className="w-[66px] h-[66px] object-cover rounded-full group-hover:scale-105 transition-transform duration-200 border-2 border-gray-700 group-hover:border-blue-500"
                        src={user?.profileImg || defaultAvatar}
                    />
                    <div className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-[2px] border-2 border-black flex items-center justify-center translate-x-1 translate-y-1 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                </div>
                <div className="text-[12px] truncate w-[74px] text-center text-gray-300 font-medium group-hover:text-white transition-colors">Your story</div>
            </div>

            {stories.map((story) => (
                <div key={story.id} className="flex flex-col gap-1.5 flex-shrink-0 items-center cursor-pointer group active:scale-95 transition-transform duration-150">
                    <div className="ig-story-gradient">
                        <div className="bg-black p-[2px] rounded-full">
                            <img
                                className="w-[66px] h-[66px] object-cover rounded-full group-hover:scale-105 transition-transform duration-200"
                                src={story.img}
                            />
                        </div>
                    </div>
                    <div className="text-[12px] truncate w-[74px] text-center text-gray-300 font-medium group-hover:text-white transition-colors">{story.name}</div>
                </div>
            ))}
        </div>
    )
}

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const stories = [
    {
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Maggie",
        id: 1,
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdHx8fGVufDB8fHx8fA%3D%3D",
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
        img: "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90byw2x8fGVufDB8fHx8fA%3D%3D",
        name: "Richard",
        id: 5,
    },
    {
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90bywHx8fGVufDB8fHx8fA%3D%3D",
        name: "Hannah",
        id: 6,
    },
    {
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90bywHx8fGVufDB8fHx8fA%3D%3D",
        name: "Maggie",
        id: 7,
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90bywHx8fGVufDB8fHx8fA%3D%3D",
        name: "Steve",
        id: 8,
    },
    {
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90bywHx8fGVufDB8fHx8fA%3D%3D",
        name: "Stephenie",
        id: 9,
    },
    {
        img: "https://images.unsplash.com/photo-1698510047345-ff32de8a3b74?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90bywHx8fGVufDB8fHx8fA%3D%3D",
        name: "John",
        id: 10,
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90bywHx8fGVufDB8fHx8fA%3D%3D",
        name: "Richard",
        id: 11,
    },
    {
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90bywHx8fGVufDB8fHx8fA%3D%3D",
        name: "Hannah",
        id: 12,
    },
];

export const StatusBar = () => {
    const { user } = useContext(AuthContext);

    const defaultAvatar =
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop";

    return (
        <div className="relative w-[630px] max-w-full">

            {/* Subtle Stories Glow */}
            <div className="absolute inset-0 bg-blue-600/[0.04] blur-2xl pointer-events-none" />

            <div className="relative flex gap-4 w-full overflow-x-auto no-scrollbar py-4 px-4 bg-[#090b12]/90 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]">

                {/* Your Story */}
                <div className="flex flex-col gap-2 flex-shrink-0 items-center cursor-pointer group active:scale-95 transition-all duration-200">

                    <div className="relative">

                        {/* Hover Glow */}
                        <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />

                        <div className="relative rounded-full p-[2px] bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">

                            <div className="bg-[#090b12] rounded-full p-[2px]">

                                <img
                                    className="w-[66px] h-[66px] object-cover rounded-full group-hover:scale-[1.04] transition-transform duration-300"
                                    src={user?.profileImg || defaultAvatar}
                                    alt="Your story"
                                />

                            </div>
                        </div>

                        {/* Add Button */}
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-[3px] border-[#090b12] flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform duration-200">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                                className="w-3 h-3 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>

                        </div>
                    </div>

                    <div className="text-[12px] truncate w-[74px] text-center text-gray-300 font-medium group-hover:text-white transition-colors">
                        Your story
                    </div>
                </div>

                {/* Other Stories */}
                {stories.map((story) => (
                    <div
                        key={story.id}
                        className="flex flex-col gap-2 flex-shrink-0 items-center cursor-pointer group active:scale-95 transition-all duration-200"
                    >
                        <div className="relative">

                            {/* Story Glow */}
                            <div className="absolute inset-0 rounded-full bg-fuchsia-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />

                            {/* Story Ring */}
                            <div className="relative rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-fuchsia-500 transition-all duration-300">

                                <div className="bg-[#090b12] rounded-full p-[2px]">

                                    <img
                                        className="w-[66px] h-[66px] object-cover rounded-full group-hover:scale-[1.04] transition-transform duration-300"
                                        src={story.img}
                                        alt={story.name}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="text-[12px] truncate w-[74px] text-center text-gray-300 font-medium group-hover:text-white transition-colors">
                            {story.name}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

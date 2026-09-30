
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LeftNav } from "../components/Home/LeftNav";

export const Layout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen text-white font-sans flex bg-[#050509]">

      {/* Overall Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#050509] via-[#080b18] to-[#120817]">

        {/* Blue Glow - Top Left */}
        <div className="absolute top-[-120px] left-[15%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[140px]" />

        {/* Purple Glow - Top Right */}
        <div className="absolute top-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[140px]" />

        {/* Pink Glow - Bottom Center */}
        <div className="absolute bottom-[-150px] left-[40%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        {/* Blue Glow - Bottom Left */}
        <div className="absolute bottom-[5%] left-[-100px] w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[130px]" />

      </div>

      {/* Left Navigation */}
      {user && <LeftNav />}

      {/* Main Content */}
      <div className="flex-1 min-w-0 relative">
        <Outlet />
      </div>

    </div>
  );
};


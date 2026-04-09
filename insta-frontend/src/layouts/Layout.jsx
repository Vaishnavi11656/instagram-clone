import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LeftNav } from "../components/Home/LeftNav";

export const Layout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans flex">
      {user && <LeftNav />}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaLink } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";
import { useTheme } from "../theme-provider";
import { RiTodoLine } from "react-icons/ri";

interface SidebarProps {
  isOpen: boolean; 
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const {theme}=useTheme()
  return (
    <div
    className={`${
      isOpen ? "block" : "hidden"
    } duration-300 ease-out fixed shadow-xl md:block h-full top-[70px] md:top-[80px] z-50 ${
      theme === "dark" ? "bg-black transition-colors" : "bg-white transition-colors"
    }`}
  >
  
      <div className="flex flex-col items-center space-y-4 p-6 rounded-lg">
        <Link to="/tweets">
          <div className="flex items-center p-4 rounded-lg transition-shadow duration-200 ease-in-out w-full max-w-xs ">
            <FaTwitter className="text-blue-500 text-2xl mr-3" />
            <p className="text-lg font-semibold">Tweets</p>
          </div>
        </Link>

      
        <Link to="/youtube">
          <div className="flex items-center p-3 rounded-lg transition-shadow duration-200 ease-in-out w-full max-w-xs ">
            <FaYoutube className="text-red-500 text-2xl mr-3" />
            <p className="text-lg font-semibold">YouTube</p>
          </div>
        </Link>

        <Link to="/article">
          <div className="flex items-center p-4 rounded-lg transition-shadow duration-200 ease-in-out w-full max-w-xs ">
            <IoMdDocument className="text-blue-400 text-2xl mr-3" />
            <p className="text-lg font-semibold">Article</p>
          </div>
        </Link>

        <Link to="/notes">
          <div className="flex items-center p-4 rounded-lg transition-shadow duration-200 ease-in-out w-full max-w-xs ">
            <RiTodoLine className="text-2xl mr-3 text-yellow-200" />
            <p className="text-lg font-semibold">Notes</p>
          </div>
        </Link>

        <Link to="/links">
          <div className="flex items-center p-4 rounded-lg transition-shadow duration-200 ease-in-out w-full max-w-xs ">
            <FaLink className="text-green-500 text-2xl mr-3" />
            <p className="text-lg font-semibold">Link</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

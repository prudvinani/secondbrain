import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import secondbrain from "../../public/brains.png";
import HeaderMobileMenu from "../NavbarBar/HeaderMobileMenu";
import HeaderDesktopMenu from "../NavbarBar/HeaderDesktopMenu";
import Sidebar from "../NavbarBar/Sidebar";
import { useContent } from "../UseContent";
import { Link } from "react-router-dom";
import { CardArticle } from "../Cards/CardArticle";
import { useTheme } from "../theme-provider";

export const Article:React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { content, deleteContent } = useContent();
  const {theme}=useTheme()

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const LinkContent = content.filter((item) => item.type === "documentation");

  return (
    <div className="w-full h-screen">
      <div className={`flex justify-between p-5 shadow-md fixed w-full z-10 ${theme === "dark" ? "bg-black text-white":"bg-white text-black" }`}>
        <div className="flex items-center">
          <MdOutlineMenu
            size={23}
            className="block md:hidden mr-2 cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <img src={secondbrain} alt="Logo" className="rounded-md mr-1" width={30} height={30} />
          <Link to="/home">
            <p className="tracking-tight text-xl font-semibold">
              Second <span className="text-green-300">Brain</span>
            </p>
          </Link>
        </div>

        <div className="hidden md:block">
          <HeaderDesktopMenu onLogout={handleLogout} />
        </div>
        <div className="block md:hidden">
          <HeaderMobileMenu onLogout={handleLogout} />
        </div>
      </div>

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:pl-[250px] md:pt-24 px-5 pt-32">
            {LinkContent.map((item) => (
              <CardArticle
                key={item._id}
                id={item._id}
                title={item.title}
                link={item.link}
                type={item.type}
                onDelete={deleteContent}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


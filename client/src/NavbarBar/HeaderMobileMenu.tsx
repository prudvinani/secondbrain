import React from "react";
import { IoMdAdd } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { IoShareSocial } from "react-icons/io5"; // Updated import
import { ModeToggle } from "../components/mode-toggle";
import ShareBrainDialog from "./ShareBrainDialog";
import AddContentDialog from "./AddContentDialog";

interface Props {
  onLogout: () => void;
}

const HeaderMobileMenu: React.FC<Props> = ({ onLogout }) => {
  return (
    <div className="flex items-center space-x-2">
      <ShareBrainDialog trigger={<IoShareSocial className="cursor-pointer" size={23} />} />
      <AddContentDialog trigger={<IoMdAdd className="cursor-pointer" size={23} />} />
      <ModeToggle />
      <LuLogOut size={23} className="cursor-pointer" onClick={onLogout} />
    </div>
  );
};

export default HeaderMobileMenu;

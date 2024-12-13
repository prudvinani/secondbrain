import React from "react";
import { LuLogOut } from "react-icons/lu";
import { ModeToggle } from "../components/mode-toggle";
import ShareBrainDialog from "./ShareBrainDialog";
import AddContentDialog from "./AddContentDialog";

interface Props {
  onLogout: () => void;
}

const HeaderDesktopMenu: React.FC<Props> = ({ onLogout }) => {
  return (
    <div className="flex items-center space-x-3">
      <AddContentDialog />
      <ShareBrainDialog /> 
      <ModeToggle />
      <LuLogOut size={23} className="cursor-pointer" onClick={onLogout} />
    </div>
  );
};

export default HeaderDesktopMenu;

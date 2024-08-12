import React from "react";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900">
      <ModeToggle/>        
    </header>
  );
};

export default Header;

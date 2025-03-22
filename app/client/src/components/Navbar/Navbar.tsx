import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar dark-navbar">
      {/* <nav className={`navbar ${isDarkMode ? "dark-navbar" : "light-navbar"}`}> */}
      <div className="site-title">ToxiMeter</div>
      <div style={{ marginRight: "3rem" }}>
        {/* <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> */}
      </div>
    </nav>
  );
};

export default Navbar;

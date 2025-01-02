// File: components/Sidebar.jsx
import React from "react";
import { Home, Search, Compass, User } from "lucide-react"; // Changed Explore to Compass
import Logo from "../assets/Logo.png";

const Sidebar = () => {
  const navItems = [
    { text: "Home", icon: Home },
    { text: "Search", icon: Search },
    { text: "Explore", icon: Compass }, // Using Compass instead of Explore
    { text: "Profile", icon: User },
  ];

  return (
    <div className="hidden md:block fixed top-0 left-0 w-64 h-full bg-slate-800 ">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center flex-shrink-0 gap-2">
                    <img
                      src={Logo}
                      alt="Network Alarm Logo"
                      className="h-20 w-20 object-contain" // Ensures the logo is clearly visible
                    />
                    <h1 className="text-xl font-bold text-white">
                      <span className="text-orange-500">Network</span> Alarm
                    </h1>
                  </div>
      </div>
      {navItems.map((item) => (
        <button
          key={item.text}
          className="flex items-center gap-4 w-full p-4 bg-slate-800 text-gray-400 hover:text-orange-500 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <item.icon size={20} />
          <span>{item.text}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
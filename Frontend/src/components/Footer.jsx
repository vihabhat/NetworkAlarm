// File: components/Footer.jsx
import React from "react";
import { Home, Search, Compass, User } from "lucide-react"; // Changed Explore to Compass

const Footer = () => {
  const navItems = [
    { text: "Home", icon: Home },
    { text: "Search", icon: Search },
    { text: "Explore", icon: Compass }, // Using Compass instead of Explore
    { text: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 md:hidden overflow-x-hidden">
      <div className="flex justify-around p-4">
        {navItems.map((item) => (
          <button
            key={item.text}
            className="flex flex-col items-center gap-1 bg-slate-800 text-gray-400 hover:text-orange-500 transition-colors"
          >
            <item.icon size={20} />
            <span className="text-xs">{item.text}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Footer;

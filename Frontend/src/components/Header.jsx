import React, { useState } from "react";
import { Search, Bell, User, X } from "lucide-react";
import UserDropdown from "./UserDropdown";
import Logo from "../assets/Logo.png";

const Header = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="bg-slate-800 sticky overflow-x-hidden top-0 z-30 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo and Title */}
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

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 bg-slate-700 rounded-full px-4 py-2 mx-4">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400"
            />
            <Search size={20} />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 hover:bg-slate-700 rounded-full"
          >
            <Search size={20} />
          </button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 relative">
            <button
              className="p-2 bg-orange-500 rounded-full hover:bg-orange-600"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            >
              <User size={20} />
            </button>
            {userDropdownOpen && <UserDropdown isOpen={userDropdownOpen} />}
          </div>
        </div>
      </header>

      {/* Mobile Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-slate-800 p-4 w-full">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search events..."
                className="flex-1 bg-slate-700 rounded-full px-4 py-2 border-none outline-none text-white placeholder-gray-400"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-slate-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

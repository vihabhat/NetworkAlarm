import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  User,
  Menu,
  Home,
  Calendar,
  Settings,
  X,
  LogOut,
  Users,
  Compass
} from 'lucide-react';

const navItems = [
  { text: "Home", icon: Home },
  { text: "Events", icon: Calendar },
  // { text: "Explore", icon: Compass },
  // { text: "Community", icon: Users },
  { text: "Settings", icon: Settings },
];

const UserDropdown = ({ isOpen }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) return;

        const response = await fetch(
          `http://localhost:5000/api/users/${email}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  if (!isOpen || !userData) return null;

  const handleSignOut = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="absolute right-0 top-12 w-64 bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h3 className="font-semibold text-lg">{userData.name}</h3>
        <p className="text-sm text-gray-400">{userData.email}</p>
      </div>
      <div className="p-2">
        <div className="p-2 text-sm text-gray-400">
          <p>College: {userData.college_name}</p>
          <p>College ID: {userData.college_id}</p>
          <p>Username: {userData.username}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full mt-2 p-2 text-left text-red-500 hover:bg-slate-700 rounded flex items-center gap-2"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  const LogoSection = () => (
    <div className="flex items-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12">
        <img
          src="../src/assets/Logo.png"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="font-bold text-lg sm:text-xl text-white ml-2">
        <span className="text-orange-500">Network</span> Alarm
      </h1>
    </div>
  );

  return (
    <>
      <div className="hidden lg:flex flex-col fixed h-full w-40 bg-slate-800">
        <div className="p-6">
          <LogoSection />
        </div>
        <div className="flex flex-col mt-4">
          {navItems.map((item) => (
            <button
              key={item.text}
              className="flex items-center gap-4 p-4 bg-slate-800 text-gray-400 hover:text-orange-500 hover:bg-slate-700 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-slate-800 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          {/* Left section with menu and logo */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 bg-slate-800 text-gray-400 hover:text-orange-500"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <LogoSection />
          </div>

          {/* Right section with search, notifications, and user */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-slate-700 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search events..."
                className="bg-transparent border-none outline-none text-white placeholder-gray-400"
              />
              <Search size={20} />
            </div>
            <button className="p-2 bg-slate-800 hover:text-orange-500">
              <Bell size={20} />
            </button>
            <div className="relative">
              <button
                className="p-2 bg-orange-500 rounded-full hover:bg-orange-600"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <User size={20} />
              </button>
              <UserDropdown isOpen={userDropdownOpen} />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 bg-slate-700 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search events..."
              className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
            />
            <Search size={20} />
          </div>
        </div>
      </header>

      {/* Tablet Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:block lg:hidden">
          <div 
            ref={sidebarRef}
            className="w-64 h-full bg-slate-800 transform transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between p-6">
              <button 
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-orange-500"
              >
                <X size={24} />
              </button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.text}
                className="flex items-center gap-4 p-4 w-full bg-slate-800 text-gray-400 hover:text-orange-500 hover:bg-slate-700"
              >
                <item.icon size={20} />
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 md:hidden">
        <div className="flex justify-around p-4">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.text}
              className="flex flex-col items-center gap-1 bg-slate-800 text-gray-400 hover:text-orange-500"
            >
              <item.icon size={20} />
              <span className="text-xs">{item.text}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
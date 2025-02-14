import React, { useState, useRef, useEffect } from 'react';
import {
  Code,
  Cpu,
  Music,
  ChevronRight,
  Users,
  Calendar,
  MapPin,
  Bell,
  Search,
  User,
  Menu,
  PlusCircle,
  Trophy,
  Dumbbell,
  Mic2,
  HeartHandshake,
  Home,
  Settings,
  X,
  LogOut
} from 'lucide-react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { text: "Home", icon: Home },
  { text: "Events", icon: Calendar },
  { text: "Settings", icon: Settings },
];

const clubsData = {
  technical: [
    {
      id: 1,
      name: "Coding Club",
      icon: Code,
      members: 120,
      description: "Join us to explore programming, algorithms, and software development. Regular hackathons and coding competitions.",
      meetingTime: "Every Tuesday, 5:00 PM",
      location: "Computer Science Lab",
      upcomingEvent: "Annual Hackathon 2024"
    },
    {
      id: 2,
      name: "Robotics Club",
      icon: Cpu,
      members: 85,
      description: "Build and program robots, participate in robotics competitions, and work on innovative projects.",
      meetingTime: "Every Wednesday, 4:00 PM",
      location: "Engineering Workshop",
      upcomingEvent: "Robot Wars Competition"
    }
  ],
  sports: [
    {
      id: 3,
      name: "Football Club",
      icon: Trophy,
      members: 150,
      description: "Train with experienced coaches, participate in inter-college tournaments, and develop teamwork skills.",
      meetingTime: "Mon, Wed, Fri 6:00 PM",
      location: "College Ground",
      upcomingEvent: "Inter-College Tournament"
    },
    {
      id: 4,
      name: "Fitness Club",
      icon: Dumbbell,
      members: 60,
      description: "Join our fitness sessions, learn proper techniques, and achieve your fitness goals.",
      meetingTime: "Tue, Thu 4:00 PM",
      location: "College Gym",
      upcomingEvent: "Summer Fitness Challenge"
    }
  ],
  drama: [
    {
      id: 5,
      name: "Theatre Club",
      icon: Mic2,
      members: 90,
      description: "Express yourself through acting, learn stage presence, and perform in college productions.",
      meetingTime: "Every Saturday, 2:00 PM",
      location: "Auditorium",
      upcomingEvent: "Annual Theatre Festival"
    },
    {
      id: 6,
      name: "Music & Drama Club",
      icon: HeartHandshake,
      members: 75,
      description: "Combine music and drama in spectacular performances. Open for all skill levels.",
      meetingTime: "Every Friday, 3:00 PM",
      location: "Music Room",
      upcomingEvent: "Musical Theatre Show"
    }
  ]
};

const UserDropdown = ({ isOpen }) => {
    
  const [userData, setUserData] = useState({
    name: "Viha Suhas Bhat",
    email: "vihabhat3@gmail.com",
    college_name: "SVCE",
    college_id: "1ve22is059",
    username: "vihabhat3@gmail.com"
  });

  if (!isOpen) return null;

//   const handleSignOut = () => {
//     console.log("Sign out clicked");
//   };

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
          onClick={() => navigate('/login')}
          className="w-full mt-2 p-2 text-left text-red-500 hover:bg-slate-700 rounded flex items-center gap-2"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

const ClubCard = ({ club }) => {
  const Icon = club.icon;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/home')}
      className="bg-slate-800 rounded-xl p-6 cursor-pointer hover:bg-slate-700 transition-all duration-200"
    >
    <div className="bg-slate-800 rounded-lg p-6 hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500 rounded-lg">
            <Icon size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{club.name}</h3>
            <div className="flex items-center text-gray-400 text-sm">
              <Users size={16} className="mr-1" />
              <span>{club.members} members</span>
            </div>
          </div>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>
      
      <p className="text-gray-400 mb-4">{club.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-400">
          <Calendar size={16} className="mr-2" />
          <span>{club.meetingTime}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <MapPin size={16} className="mr-2" />
          <span>{club.location}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="text-orange-500">
          <span className="font-semibold">Upcoming: </span>
          {club.upcomingEvent}
        </div>
      </div>
    </div>
    </div>
  );
};

const ClubSection = ({ title, clubs }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {clubs.map(club => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  </div>
);

const LogoSection = () => (
  <div className="flex items-center">
    <div className="w-10 h-10 sm:w-12 sm:h-12">
      <img src="../src/assets/Logo.png" alt="Logo" className="w-full h-full object-contain" />
    </div>
    <h1 className="font-bold text-lg sm:text-xl text-white ml-2">
      <span className="text-orange-500">Network</span> Alarm
      
    </h1>
  </div>
);

const ClubsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Desktop Sidebar */}
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

      <div className="lg:ml-40">
        {/* Header */}
        <header className="bg-slate-800 sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 bg-slate-800 text-gray-400 hover:text-orange-500"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu size={24} />
              </button>
              <div className="lg:hidden">
                <LogoSection />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-slate-700 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search clubs..."
                  className="bg-transparent border-none outline-none text-white placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

          <div className="sm:hidden p-4 border-t border-slate-700">
            <div className="flex items-center gap-2 bg-slate-700 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search clubs..."
                className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Main Content */}
        <main className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">College Clubs</h1>
            {/* <button className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">
              <PlusCircle size={20} />
              Create Club
            </button> */}
          </div>

          <ClubSection title="Technical Clubs" clubs={clubsData.technical} />
          <ClubSection title="Sports Clubs" clubs={clubsData.sports} />
          <ClubSection title="Drama & Music Clubs" clubs={clubsData.drama} />
        </main>

        {/* Mobile Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 md:hidden">
          <div className="flex justify-around p-4">
            {navItems.map((item) => (
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
      </div>
    </div>
  );
};

export default ClubsPage;
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MessageSquare,
  Share2,
  Bell,
  Search,
  Home,
  Calendar,
  Compass,
  User,
  Users,
  Settings,
  Menu,
  LogOut,
  PlusCircle,
  Check,
  X,
} from "lucide-react";

const defaultCollegeEvents = [
  {
    id: 1,
    college: "MIT College",
    verified: true,
    title: "Tech Innovation Summit 2024",
    description:
      "Join us for a day of cutting-edge technology discussions and networking.",
    date: "2024-01-20",
    time: "09:00",
    likes: 24,
    comments: 5,
    shares: 2,
    location: "Main Auditorium",
    fullDescription:
      "A comprehensive day of technology discussions, workshops, and networking opportunities with industry leaders. Perfect for students and professionals alike.",
    agenda: [
      "09:00 - Registration",
      "10:00 - Keynote Speech",
      "11:30 - Workshop Sessions",
      "13:00 - Networking Lunch",
      "14:30 - Panel Discussions",
      "16:30 - Closing Remarks",
    ],
  },
];

const upcomingEvents = [
  {
    id: 2,
    title: "AI Workshop",
    date: "2024-01-25",
    time: "14:00",
  },
  {
    id: 3,
    title: "Career Fair",
    date: "2024-01-28",
    time: "10:00",
  },
];

const navItems = [
  { text: "Home", icon: Home },
  { text: "Events", icon: Calendar },
  { text: "Settings", icon: Settings },
];

const CalendarWidget = ({ events }) => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDay = firstDayOfMonth.getDay();

  // Convert event dates to day numbers for highlighting
  const eventDays = events.map(event => new Date(event.date).getDate());

  // Generate calendar days
  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar size={20} className="text-orange-500" />
          {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}
        </h3>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-sm text-gray-400">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center rounded-full text-sm
              ${day === null ? 'invisible' : ''}
              ${day === today.getDate() ? 'bg-orange-500 text-white' : ''}
              ${eventDays.includes(day) && day !== today.getDate() ? 'bg-orange-500/20 text-orange-500' : ''}
            `}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

const SocialAction = ({ icon: Icon, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
      isActive ? "text-orange-500" : "text-gray-400 hover:text-orange-500"
    }`}
  >
    <Icon size={20} />
    <span>{count}</span>
  </button>
);

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(event.likes);
  const [comments, setComments] = useState(event.comments);
  const [shares, setShares] = useState(event.shares);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const handleComment = (e) => {
    e.stopPropagation();
    setComments((prev) => prev + 1);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    setShares((prev) => prev + 1);
  };

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="bg-slate-800 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
            <div>
              <div className="flex items-center">
                <h3 className="font-semibold">{event.college}</h3>
                {event.verified && (
                  <Check className="w-4 h-4 text-orange-500 ml-2" />
                )}
              </div>
              <p className="text-sm text-gray-400">
                {new Date(event.date).toLocaleDateString()} • {event.time}
              </p>
            </div>
          </div>
          <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-200">
            Follow
          </button>
        </div>
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-400 mb-6">{event.description}</p>
        <div className="flex gap-6">
          <SocialAction
            icon={Heart}
            count={likes}
            isActive={isLiked}
            onClick={handleLike}
          />
          <SocialAction
            icon={MessageSquare}
            count={comments}
            onClick={handleComment}
          />
          <SocialAction icon={Share2} count={shares} onClick={handleShare} />
        </div>
      </div>
    </div>
  );
};

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

const UpcomingEventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/events')}
      className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors duration-200"
    >
      <h4 className="font-semibold">{event.title}</h4>
      <p className="text-sm text-gray-400">
        {event.date} • {event.time}
      </p>
    </div>
  );
};

const AddEventForm = ({ open, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    college: "",
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...eventData,
      verified: true,
      likes: 0,
      comments: 0,
      shares: 0,
    });
    setEventData({
      title: "",
      description: "",
      date: "",
      time: "",
      college: "",
    });
    onClose();
  };

  return (
    <>
      <div
        onClick={() => navigate('/events')}
        className="bg-slate-800 rounded-xl p-6 cursor-pointer hover:bg-slate-700 transition-all duration-200"
      ></div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-lg w-full max-w-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                className="w-full p-2 rounded bg-slate-700"
                value={eventData.title}
                onChange={(e) =>
                  setEventData({ ...eventData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                rows="3"
                className="w-full p-2 rounded bg-slate-700"
                value={eventData.description}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="College Name"
                className="w-full p-2 rounded bg-slate-700"
                value={eventData.college}
                onChange={(e) =>
                  setEventData({ ...eventData, college: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="p-2 rounded bg-slate-700"
                  value={eventData.date}
                  onChange={(e) =>
                    setEventData({ ...eventData, date: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="p-2 rounded bg-slate-700"
                  value={eventData.time}
                  onChange={(e) =>
                    setEventData({ ...eventData, time: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const NetworkAlarm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [addEventOpen, setAddEventOpen] = useState(false);
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

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleAddEvent = async (eventData) => {
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        fetchEvents();
        setAddEventOpen(false);
        navigate('/events'); // Navigate to the newly created event
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const LogoSection = () => (
    <div className="flex items-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12">
        <img
          src="../src/assets/Logo.png"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="font-bold text-lg sm:text-xl text-white ml-2 whitespace-nowrap">
        Network Alarm
      </h1>
    </div>
  );


  return (
    
    <div className="min-h-screen w-screen bg-slate-900 overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col fixed h-full w-80 bg-slate-800">
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
              <span className="whitespace-nowrap">{item.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Header */}
        <header className="bg-slate-800 sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                className="hidden md:block lg:hidden p-2 bg-slate-800 text-gray-400 hover:text-orange-500"
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

        {/* Main Content Area */}
        <main className="p-4 md:p-6 max-w-7xl mx-auto pb-24 md:pb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Events</h2>
            <button
              onClick={() => setAddEventOpen(true)}
              className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              <PlusCircle size={20} />
              Add Event
            </button>
          </div>

          {/* Grid Layout for Main Content and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Column */}
            <div className="lg:col-span-3">
              {/* Upcoming Events Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Upcoming Events
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingEvents.map((event) => (
                    <UpcomingEventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* Calendar Column */}
            <div className="lg:col-span-1">
              <CalendarWidget events={[...events, ...upcomingEvents]} />
            </div>
          </div>

          {/* Add Event Form */}
          <AddEventForm
            open={addEventOpen}
            onClose={() => setAddEventOpen(false)}
            onSubmit={handleAddEvent}
          />
        </main>

        {/* Mobile Navigation */}
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
      </div>
    </div>
  );
};

export default NetworkAlarm;
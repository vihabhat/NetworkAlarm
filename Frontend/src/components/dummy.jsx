import React, { useState, useRef, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Share2, Bell, Search, Home, Calendar, Compass, User, Users, Settings, Menu,LogOut, PlusCircle, Check } from 'lucide-react';

const defaultCollegeEvents = [
  {
    id: 1,
    college: "MIT College",
    verified: true,
    title: "Tech Innovation Summit 2024",
    description: "Join us for a day of cutting-edge technology discussions and networking.",
    date: "2024-01-20",
    time: "09:00",
    likes: 24,
    comments: 5,
    shares: 2,
    image: "/api/placeholder/600/300",
    location: "Main Auditorium",
    fullDescription: "A comprehensive day of technology discussions, workshops, and networking opportunities with industry leaders. Perfect for students and professionals alike.",
    agenda: [
      "09:00 - Registration",
      "10:00 - Keynote Speech",
      "11:30 - Workshop Sessions",
      "13:00 - Networking Lunch",
      "14:30 - Panel Discussions",
      "16:30 - Closing Remarks"
    ]
  }
];
const userData = {
  name: "John Doe",
  email: "john@example.com",
  role: "Student",
  college: "MIT College"
};

const upcomingEvents = [
  {
    id: 2,
    title: "AI Workshop",
    date: "2024-01-25",
    time: "14:00"
  },
  {
    id: 3,
    title: "Career Fair",
    date: "2024-01-28",
    time: "10:00"
  }
];

const navItems = [
  { text: 'Home', icon: Home },
  { text: 'Events', icon: Calendar },
  { text: 'Explore', icon: Compass },
  { text: 'Community', icon: Users },
  { text: 'Settings', icon: Settings }
];

const SocialAction = ({ icon: Icon, count, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
      isActive ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
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
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  const handleComment = (e) => {
    e.stopPropagation();
    setComments(prev => prev + 1);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    setShares(prev => prev + 1);
  };

  return (
    <div 
      onClick={() => navigate(`/events/${event.id}`)}
      className="bg-slate-800 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
      </div>
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
          <SocialAction icon={Heart} count={likes} isActive={isLiked} onClick={handleLike} />
          <SocialAction icon={MessageSquare} count={comments} onClick={handleComment} />
          <SocialAction icon={Share2} count={shares} onClick={handleShare} />
        </div>
      </div>
    </div>
  );
};

const UserDropdown = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute right-0 top-12 w-64 bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h3 className="font-semibold text-lg">{userData.name}</h3>
        <p className="text-sm text-gray-400">{userData.email}</p>
      </div>
      <div className="p-2">
        <div className="p-2 text-sm text-gray-400">
          <p>Role: {userData.role}</p>
          <p>College: {userData.college}</p>
        </div>
        <button className="w-full mt-2 p-2 text-left text-red-500 hover:bg-slate-700 rounded flex items-center gap-2">
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
      onClick={() => navigate(`/events/${event.id}`)}
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
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    college: '',
    image: '/api/placeholder/600/300'
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...eventData, verified: true, likes: 0, comments: 0, shares: 0 });
    setEventData({ title: '', description: '', date: '', time: '', college: '', image: '/api/placeholder/600/300' });
    onClose();
  };

  return (
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
              onChange={e => setEventData({ ...eventData, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              rows="3"
              className="w-full p-2 rounded bg-slate-700"
              value={eventData.description}
              onChange={e => setEventData({ ...eventData, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="College Name"
              className="w-full p-2 rounded bg-slate-700"
              value={eventData.college}
              onChange={e => setEventData({ ...eventData, college: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="p-2 rounded bg-slate-700"
                value={eventData.date}
                onChange={e => setEventData({ ...eventData, date: e.target.value })}
              />
              <input
                type="time"
                className="p-2 rounded bg-slate-700"
                value={eventData.time}
                onChange={e => setEventData({ ...eventData, time: e.target.value })}
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
  );
};


const NetworkAlarm = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [events, setEvents] = useState(defaultCollegeEvents);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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
    <div className="min-h-screen w-screen bg-slate-900">
  {/* Desktop Sidebar */}
  <div className="hidden md:flex flex-col fixed h-full w-80 bg-slate-800">
    {/* Logo Section */}
    <div className="flex items-center p-4">
      <div className="w-32 h-32 flex items-center justify-center">
        <img
          src="../src/assets/Logo.png"
          alt="Logo"
          className="w-32 h-32 object-contain" // Ensures the logo maintains its aspect ratio
        />
      </div>
      <h1 className="text-xl font-bold text-white ml-4">
        <span className="text-orange-500">Network</span> Alarm
      </h1>
    </div>

    {/* Navigation Items */}
    <div className="flex flex-col mt-4">
      {navItems.map((item) => (
        <button
          key={item.text}
          className="flex items-center gap-4 p-4 text-gray-400 bg-slate-800 hover:text-orange-500 hover:bg-slate-700 rounded-lg"
        >
          <item.icon size={20} />
          <span>{item.text}</span>
        </button>
      ))}
    </div>
  </div>

  {/* Main Content */}
  <div className="md:ml-80">
    {/* Header */}
    <header className="bg-slate-800 sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-orange-500"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Search and Notifications */}
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

    {/* Main Content Area */}
    <main className="p-4 md:p-6 max-w-7xl mx-auto">
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

      {/* Upcoming Events Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <UpcomingEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  </div>

  {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div ref={sidebarRef} className="w-64 h-full bg-slate-800 p-4">
            {/* Sidebar content */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src="../src/assets/Logo.png"
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
              <h1 className="text-xl font-bold text-white">
                <span className="text-orange-500">Network</span> Alarm
              </h1>
            </div>
            {navItems.map((item) => (
              <button
                key={item.text}
                className="flex items-center gap-4 p-4 text-gray-400 bg-slate-800 hover:text-orange-500 rounded-lg"
              >
                <item.icon size={20} />
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
        {/* Bottom Navbar */}
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
  {/* Add Event Dialog */}
  <AddEventForm
        open={addEventOpen}
        onClose={() => setAddEventOpen(false)}
        onSubmit={(newEvent) => setEvents([{ id: events.length + 1, ...newEvent }, ...events])}
      />
</div>
      
  );
};

export default NetworkAlarm;

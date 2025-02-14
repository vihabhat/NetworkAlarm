import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  Heart,
  MessageSquare,
  Check,
  AlertCircle,
  Ticket
} from 'lucide-react';
import Navbar from './navbar';

const eventData = {
  id: 1,
  title: "Student Parliament 2025",
  college: "SVCE",
  verified: true,
  date: "2025-02-27",
  time: "09:30",
  endTime: "17:00",
  location: "Main Auditorium",
  registrationDeadline: "2025-02-25",
  fee: 500,
  maxParticipants: 150,
  currentParticipants: 89,
  likes: 245,
  comments: 42,
  shares: 78,
  description: "Join us for the annual Student Parliament where young minds come together to debate and discuss crucial issues affecting our education system and society.",
  rules: [
    "All participants must be currently enrolled students",
    "Each college can send a maximum of 5 representatives",
    "Formal dress code is mandatory",
    "Participants must prepare a 5-minute speech on the given topic",
    "Use of electronic devices during sessions is prohibited",
    "Questions must be submitted in writing to the moderator",
    "Respect the time limits for speeches and rebuttals",
    "Follow parliamentary language and decorum"
  ],
  agenda: [
    "10:00 - Opening Ceremony",
    "10:30 - Keynote Address",
    "11:30 - First Parliamentary Session",
    "13:00 - Lunch Break",
    "14:00 - Second Parliamentary Session",
    "16:00 - Voting and Resolutions",
    "16:45 - Closing Ceremony"
  ]
};

const EventDetailsPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(true);
  
  const getTimeLeft = () => {
    const deadline = new Date(eventData.registrationDeadline);
    const now = new Date();
    const diff = deadline - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days} days ${hours} hours left`;
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {showEventDetails && (
        <div className="lg:ml-40"> {/* Adjust margin to account for sidebar width */}
          {/* Back Button Section */}
          {/* <div className="bg-slate-800 p-4 sticky top-0 z-30">
            <button 
              onClick={() => setShowEventDetails(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500"
            >
              <ArrowLeft size={20} />
              Back to Events
            </button>
          </div> */}

          {/* Main Content */}
          <div className="max-w-7xl mx-auto p-4 md:p-6 pb-24 md:pb-6"> {/* Added padding bottom for mobile nav */}
            {/* Event Header */}
            <div className="bg-slate-800 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{eventData.title}</h1>
                    {eventData.verified && (
                      <Check className="text-orange-500" size={20} />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-8 h-8 bg-orange-500 rounded-full" />
                    {eventData.college}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full ${isLiked ? 'text-orange-500' : 'text-gray-400'}`}
                  >
                    <Heart size={24} />
                  </button>
                  <button className="p-2 rounded-full text-gray-400">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>

              {/* Event Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={20} />
                  <span>{new Date(eventData.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={20} />
                  <span>{eventData.time} - {eventData.endTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={20} />
                  <span>{eventData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users size={20} />
                  <span>{eventData.currentParticipants}/{eventData.maxParticipants}</span>
                </div>
              </div>

              {/* Registration Card */}
              <div className="bg-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Registration</h3>
                    <p className="text-orange-500">{getTimeLeft()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Registration Fee</p>
                    <p className="text-xl font-bold">₹{eventData.fee}</p>
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                  <Ticket size={20} />
                  Register Now
                </button>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Description */}
                <div className="bg-slate-800 rounded-2xl p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">About the Event</h2>
                  <p className="text-gray-400 mb-6">{eventData.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">Agenda</h3>
                  <div className="space-y-2 mb-6">
                    {eventData.agenda.map((item, index) => (
                      <div key={index} className="text-gray-400">{item}</div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-3">Rules and Guidelines</h3>
                  <div className="space-y-2">
                    {eventData.rules.map((rule, index) => (
                      <div key={index} className="flex items-start gap-2 text-gray-400">
                        <AlertCircle size={20} className="text-orange-500 mt-1 flex-shrink-0" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Section */}
                <div className="bg-slate-800 rounded-2xl p-6">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Heart size={20} />
                      <span>{eventData.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MessageSquare size={20} />
                      <span>{eventData.comments}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Share2 size={20} />
                      <span>{eventData.shares}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Poster */}
              <div className="bg-slate-800 rounded-2xl p-6">
                <img 
                  src="../src/assets/Screenshot_2025-02-13_201046-removebg-preview.png"
                  alt="Event Poster" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EventApp = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <EventDetailsPage />
    </div>
  );
};

export default EventApp;
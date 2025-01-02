import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialAction from "./SocialAction";
import { Heart, MessageSquare, Share2, Check } from "lucide-react";

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

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="bg-slate-800 rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-105 flex flex-col"
    >
      <div className="relative aspect-video">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex-shrink-0"></div>
            <div className="min-w-0">
              <div className="flex items-center">
                <h3 className="font-semibold truncate">{event.college}</h3>
                {event.verified && <Check className="w-4 h-4 text-orange-500 ml-2 flex-shrink-0" />}
              </div>
              <p className="text-sm text-gray-400 truncate">
                {new Date(event.date).toLocaleDateString()} • {event.time}
              </p>
            </div>
          </div>
          <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-200 flex-shrink-0">
            Follow
          </button>
        </div>
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h2>
        <p className="text-gray-400 mb-6 line-clamp-3">{event.description}</p>
        <div className="flex gap-6 mt-auto">
          <SocialAction icon={Heart} count={likes} isActive={isLiked} onClick={handleLike} />
          <SocialAction icon={MessageSquare} count={comments} />
          <SocialAction icon={Share2} count={shares} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
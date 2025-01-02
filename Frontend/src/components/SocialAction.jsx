// File: components/SocialAction.jsx
import React from "react";

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

export default SocialAction;
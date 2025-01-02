// File: components/AddEventForm.jsx
import React, { useState } from "react";

const AddEventForm = ({ open, onClose, onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    college: "",
    image: "/api/placeholder/600/300",
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
      image: "/api/placeholder/600/300",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 overflow-x-hidden bg-black bg-opacity-50 flex items-center justify-center p-4">
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
  );
};

export default AddEventForm;

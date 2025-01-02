import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventGrid from "../components/EventGrid";
import AddEventForm from "../components/AddEventForm";
import MobileNav from "../components/MobileNav";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data.events || []); // Fallback to empty array
      setUpcomingEvents(data.upcomingEvents || []); // Fallback to empty array
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (newEvent) => {
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      await fetchEvents();
      setAddEventOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex w-screen min-h-screen bg-slate-900 overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onToggle={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        <Sidebar />
      </MobileNav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <Header />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <main className="container mx-auto px-4 py-8 lg:max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Admin Controls */}

            {/* Upcoming Events Section */}
            <div className="order-1 md:order-none w-s md:col-span-1 bg-slate-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>
              {upcomingEvents && upcomingEvents.length === 0 ? (
                <p className="text-gray-400">No upcoming events available.</p>
              ) : (
                <ul className="space-y-4">
                  {upcomingEvents?.map((event, idx) => (
                    <li key={idx} className="p-4 bg-slate-700 rounded-lg shadow">
                      <h3 className="text-white font-bold">{event.title}</h3>
                      <p className="text-gray-400 text-sm">{event.date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Events Section */}
            <div className="space-y-6 md:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Events</h2>

                {isAdmin && (
                  <button
                    onClick={() => setAddEventOpen(true)}
                    className="px-6 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-200"
                  >
                    Add New Event
                  </button>
                )}
              </div>

              {error && (
                <div className="p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg text-red-500">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin h-8 w-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <EventGrid events={events} />
              )}
            </div>
          </main>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden">
          <Footer />
        </div>
      </div>

      {isAdmin && addEventOpen && (
        <AddEventForm
          open={addEventOpen}
          onClose={() => setAddEventOpen(false)}
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  );
};

export default Home;

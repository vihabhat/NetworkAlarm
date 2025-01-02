import React from "react";
import EventCard from "./EventCard";

const EventGrid = ({ events }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {events.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </div>
);

export default EventGrid;
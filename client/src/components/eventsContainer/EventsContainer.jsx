import React, { useEffect, useState } from 'react';
import './EventsContainer.css';
import Event from '../event/Event';
import CreateEvent from '../event/CreateEvent';

const EventsContainer = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const _id = localStorage.getItem("userID");
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getEvents?_id=${_id}&type=0`);
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = (newEvent) => { //Callback event, learn more about
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) => 
      prevEvents.map(event => 
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (eventId) => {
    setEvents((prevEvents) => 
      prevEvents.filter(event => event._id !== eventId)
    );
  };


  return (
    <div className="outer-container">
      <div className="create-event-form">
        <CreateEvent onAddEvent={addEvent} />
      </div>
      <div className="events-container">
        {events.map(event => (
          <Event 
          key={event._id} 
          id={event._id} 
          name={event.name} 
          desc={event.desc} 
          color={event.color}
          onUpdateEvent={updateEvent}
          onDeleteEvent={deleteEvent}
          onMoveEvent={deleteEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsContainer;

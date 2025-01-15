import React, { useEffect, useState } from 'react';
import './EventsContainer.css';
import Event from '../event/Event';
import CreateEvent from '../event/CreateEvent';
import UpdateDeleteDatedEvent from '../event/UpdateDeleteDatedEvent';

const EventsContainer = () => {
  const [events, setEvents] = useState([]);


  const exampleDatedEvent = {
    "name": "Example Dated Event",
    "desc": "And it's desc",
    "color": "red",
    "start": {
      "$date": "2025-01-07T09:00:00.000Z"
    },
    "duration": 61,
    "_id": {
      "$oid": "678772c2b0d60670920f6e08"
    }
  }

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
      <br />
      <UpdateDeleteDatedEvent 
        eventId={exampleDatedEvent._id.$oid} 
        name={exampleDatedEvent.name} 
        desc={exampleDatedEvent.desc} 
        color={exampleDatedEvent.color} 
        start={exampleDatedEvent.start}
        duration={exampleDatedEvent.duration}
      />

    </div>
  );
};

export default EventsContainer;

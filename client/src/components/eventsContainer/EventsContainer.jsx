import React, { useEffect, useState } from 'react';
import './EventsContainer.css';
import Event from '../event/Event';
import CreateEvent from '../createEvent/CreateEvent';

const FlexContainer = () => {
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
    console.log("New event")
    console.log(newEvent)
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="outer-container">
      <div className="create-event-form">
        <CreateEvent onAddEvent={addEvent} />
        </div>
      <div className="events-container">
        {events.map(event => (
          <Event key={event._id} id={event._id} name={event.name} desc={event.desc} color={event.color} />
        ))}
      </div>
    </div>
  );
};

export default FlexContainer;

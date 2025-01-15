import { useState } from "react";
import './UpdateDeleteDatedEvent.css';
import ColorPicker from "../ui/ColorPicker/ColorPicker";
import { formatHour, isEndDateBeforeStartDate, getDurationInMinutes, formatDateToYYYYMMDD } from "../../utils/calendarUtils";


function UpdateDeleteDatedEvent({ eventId, name, desc, color, start, duration }) { 
  const [_name, setName] = useState(name);
  const [_desc, setDesc] = useState(desc);
  const [_color, setColor] = useState(color);
  const [_start, setStart] = useState(formatDateToYYYYMMDD(new Date(start.$date)));
  const [error, setError] = useState("");
  const [startTime, setStartTime] = useState(formatHour(new Date(start.$date)));
  const [endTime, setEndTime] = useState(formatHour(new Date(new Date(start.$date).getTime() + duration * 60000)));

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    setError('');

    if (isEndDateBeforeStartDate(startTime, endTime)) {
      setError("Nieprawidłowy zakres czasu");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/updateEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: localStorage.getItem("userID"),
          _eventId: eventId,
          updatedEvent: {
            name: _name,
            desc: _desc,
            color: _color,
            start: `${_start}T${startTime}`,
            duration: getDurationInMinutes(startTime, endTime)
          },
          type: 1
        }),
      });
      if (response.ok) {
        console.log('Event updated!');
        window.location.reload();
      } else {
        setError('Error: Failed to update the event');
      }
    } catch (error) {
      setError('Error: Failed to update the event');
    }
  };


  const handleDeleteEvent = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/deleteEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: localStorage.getItem("userID"),
          _eventId: eventId,
          type: 1
        }),
      });
      if (response.ok) {
        console.log('Event deleted!');
        window.location.reload();
      } else {
        setError('Error: Failed to delete the event');
      }
    } catch (error) {
      setError('Error: Failed to delete the event');
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="update-form">
        <form onSubmit={handleSubmitEdit} className="edit-form">   
          <h2>Edycja wydarzenia</h2>
          <div className="form-group">
            <label htmlFor="name">Nazwa:</label>
            <input
              type="text"
              id="name"
              value={_name}
              minLength={1}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Opis:</label>
            <input
              type="text"
              id="desc"
              value={_desc}
              minLength={1}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-start">Start:</label>
            <input
              type="date"
              id="event-start"
              value={_start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Czas:</label>
            <div className="time-container">
              <input 
                type="time" 
                name="start_time" 
                id="start_time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)} 
              />
              <span></span>
              <input 
                type="time" 
                name="end_time" 
                id="end_time" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)} 
              />
            </div>
          </div>
          <div>
            <ColorPicker setColor={setColor} value={_color} />
          </div>
          <button type="submit">Edytuj wydarzenie</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        </div>
  
        <div className="separator"></div>

        <div className="delete-form">
          <h2>Usuń wydarzenie</h2>
          <form onSubmit={handleDeleteEvent}>
            <button type="submit">Usuń wydarzenie</button>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default UpdateDeleteDatedEvent;

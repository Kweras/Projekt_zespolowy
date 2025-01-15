import { useState } from "react";
import './Event.css';
import ColorPicker from "../ui/ColorPicker/ColorPicker";
import { EVENTS_COLORS, formatHour, isEndDateBeforeStartDate, getDurationInMinutes } from "../../utils/calendarUtils";

function CreateEvent({ time, type, start }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState(EVENTS_COLORS[0].nameEnglish);
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState(time ? time :formatHour(new Date()))
  const [endTime, setEndTime] = useState(time ? time :formatHour(new Date()))

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
      
    //const formattedStart = `${start}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    const URL = type === 'withDate' ? 'createDatedEvent' : 'createEvent'

    let event = {
      name,
      desc,
      color,
    }

    if (type === 'withDate') {
      if (isEndDateBeforeStartDate(startTime, endTime)) {
        setError("Nieprawidłowy zakres czasu")
        return;
      }

      event = {
        ...event,
        start: `${start}T${startTime}`,
        duration: getDurationInMinutes(startTime, endTime),
      }
    }

    try {
      const response = await fetch(`http://localhost:3001/${URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: localStorage.getItem("userID"),
          event
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setName('');
        setDesc('');
        setColor(EVENTS_COLORS[0].nameEnglish);
        
        window.location.reload()
      } else {
        setError('Error: Failed to create an event');
      }
    } catch (error) {
      setError('Error: Failed to create an event2: ' + error);
    }
  };
  
    return (
      <div className="form-container">
        <h2>Dodaj Wydarzenie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Nazwa:
              <input
                type="text"
                value={name}
                minLength={1}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Opis:
              <input
                type="text"
                value={desc}
                minLength={1}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </label>
          </div>
          {type === 'withDate' && (
            <>
              <div className="form-group">
              <label>
                Start:
                <input
                  type="text"
                  value={start}
                  readOnly
                />
              </label>
              </div>
              <div className="form-group">
                <label htmlFor="time">Czas:</label>
                <div className="time-container">
                  <input type="time" name="start_time" id="start_time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                  <span></span>
                  <input type="time" name="start_time" id="start_time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
              </div>
            </>
          )}
        
          <div className="form-group">
            <ColorPicker setColor={setColor} />
          </div>
          
          {error && <p style={{ color: 'red', textAlign: 'center', 'paddingBottom': '5px'}}>{error}</p>}
          <button type="submit">Dodaj wydarzenie</button>
        </form>
      </div>
    );
}

export default CreateEvent;

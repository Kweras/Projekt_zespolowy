//UNFINISHED
import { useState, useEffect } from "react";

function DeleteEvent() {

  const _id = localStorage.getItem("userID");
  const [_eventId, setEventId] = useState("");
  const [type, setType] = useState("0");
  const [error, setError] = useState('');
  
  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    setError('');
 
    try {
      const response = await fetch('http://localhost:3001/deleteEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id,
          _eventId,
          type: parseInt(type)
        }),
      });
      if (response.ok) {
        console.log('Event deleted!');
      } else {
        setError('Error: Failed to delete the event');
      }
    } catch (error) {
      console.error('Error deleting event', error);
      setError('Error: Failed to delete event');
    }
  };

  return (
    <form onSubmit={handleSubmitDelete}>
      <div>
        <label>
          ID:
          <input
            type="text"
            value={_eventId}
            minLength={1}
            onChange={(e) => setEventId(e.target.value)}
            required
          />
        </label>

        <div><label>Rodzaj eventu:</label>
        <br></br>
        <label>
            <input
              type="radio"
              value="0"
              checked={type === "0"}
              onChange={(e) => setType(e.target.value)}
            />
            Regular Event
          </label>
          <br></br>
        <label>
            <input
              type="radio"
              value="1"
              checked={type === "1"}
              onChange={(e) => setType(e.target.value)}
            />
            Dated Event
          </label>
          </div>

      </div>

      <button type="submit">Usuń wydarzenie</button>
    </form>
  );
}

export default DeleteEvent;

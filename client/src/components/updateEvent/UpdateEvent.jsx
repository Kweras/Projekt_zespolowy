import { useState, useEffect } from "react";


/*
async function getData(url) {
  const response = await fetch(url);

  return response.json();
}
const data = await getData("http://localhost:3001/getEvents?_id=674f297dd30def63b31f5270&type=0");
*/

//console.log({ data })

function UpdateEvent() {
  // State for form inputs
  
  //fetch("http://localhost:3001/getEvents?_id=674f297dd30def63b31f5270&type=0").then((response) => response.json()).then((json) => console.log(json));



  const defaultEventId = "674f2998d30def63b31f5274" //tymczasowe
  const defaultId = "674f297dd30def63b31f5270"      
  const defaultEventType = 0


  


  

  const _id = localStorage.getItem("userID");
  const [  _eventId, setEventId] = useState(defaultEventId);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("Blue");
  const [error, setError] = useState('');
  const [type, setType] = useState("0");
  
  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/updateEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id,
          _eventId,
          updatedEvent: {
            name,
            desc,
            color
          },
          type: parseInt(type)
        }),
      });
      if (response.ok) {
        console.log('Event updated!');
      } else {
        setError('Error: Failed to update the event');
      }
    } catch (error) {
      console.error('Error updating event', error);
      setError('Error: Failed to update the event');
    }
  };

  return (
    <form onSubmit={handleSubmitEdit}>
      <div>
        <label>
          Event ID:
          <input
            type="text"
            value={_eventId}
            minLength={1}
            onChange={(e) => setEventId(e.target.value)}
            required
          />
        </label>
      </div>    
      <div>
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
      <div>
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
      <div>
        <label>Wybór koloru:</label>
        <div>
          <label>
            <input
              type="radio"
              value="Red"
              checked={color === "Red"}
              onChange={(e) => setColor(e.target.value)}
            />
            Red
          </label>
          <br/>
          <label>
            <input
              type="radio"
              value="Green"
              checked={color === "Green"}
              onChange={(e) => setColor(e.target.value)}
            />
            Green
          </label>
          <br/>
          <label>
            <input
              type="radio"
              value="Blue"
              checked={color === "Blue"}
              onChange={(e) => setColor(e.target.value)}
            />
            Blue
          </label>
        </div>
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
      <button type="submit">Edytuj wydarzenie</button>
    </form>
  );
}

export default UpdateEvent;

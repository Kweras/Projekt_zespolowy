import { useState, useEffect } from "react";

function CreateEvent() {
  // State for form inputs
  const _id = localStorage.getItem("userID");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("Blue");
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/createEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id,
          event: {
            name,
            desc,
            color
          }
        }),
      });
      if (response.ok) {
        console.log('Event created!');
      } else {
        setError('Error: Failed to create an event');
      }
    } catch (error) {
      console.error('Error registering user', error);
      setError('Error: Failed to create an event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      </div>
      <button type="submit">Dodaj wydarzenie</button>
    </form>
  );
}

export default CreateEvent;

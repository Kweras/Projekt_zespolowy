import { useState } from "react";
import './CreateEvent.css';

function CreateEvent({ onAddEvent }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("White");
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
          _id: localStorage.getItem("userID"),
          event: {
            name,
            desc,
            color
          }
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onAddEvent(data); //Callback event, learn more about ir later (Pitek)
        setName('');
        setDesc('');
        setColor('White');
      } else {
        setError('Error: Failed to create an event');
      }
    } catch (error) {
      //console.error('Error registering user', error);
      setError('Error: Failed to create an event2');
    }
  };

  return (
    <div className="create-event">
      <h2>Dodaj Wydarzenie</h2>
      <form onSubmit={handleSubmit} className="create-event-form-container">
        <div className="input-container">
          <label>
            Nazwa: </label>
          <input
            type="text"
            value={name}
            minLength={1}
            onChange={(e) => setName(e.target.value)}
            required
          />

        </div>
        <div className="input-container">
          <label>
            Opis:</label>
          <input
            type="text"
            value={desc}
            minLength={1}
            onChange={(e) => setDesc(e.target.value)}
            required
          />

        </div>
        <div className="input-container">
          <label>Wybór koloru:</label>
          <select>
            <option value=""></option>
          </select>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="White"
                checked={color === "White"}
                onChange={(e) => setColor(e.target.value)}
              />
              White
            </label>
            <label>
              <input
                type="radio"
                value="Red"
                checked={color === "Red"}
                onChange={(e) => setColor(e.target.value)}
              />
              Red
            </label>
            <label>
              <input
                type="radio"
                value="Green"
                checked={color === "Green"}
                onChange={(e) => setColor(e.target.value)}
              />
              Green
            </label>
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
        <button type="submit" className="login-btn">Dodaj wydarzenie</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateEvent;

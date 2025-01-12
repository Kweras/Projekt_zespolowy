import { useState } from "react";
import './Event.css';

function CreateEvent({ onAddEvent, type, start }) {

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState(1);
  const [color, setColor] = useState("White");
  const [error, setError] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  
  if(type !== "withDate"){
    
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
          <div className="form-group">
            <label>Wybór koloru:</label>
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
          <button type="submit">Dodaj wydarzenie</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
  else{
    const handleSubmit = async (event) => {
      event.preventDefault();
      setError('');
      
      const formattedStart = `${start}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  
      try {
        const response = await fetch('http://localhost:3001/createDatedEvent', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: localStorage.getItem("userID"),
            event: {
              name,
              desc,
              color,
              duration,
              start: formattedStart
            }
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // onAddEvent(data);
          setName('');
          setDesc('');
          setColor('White');
          setHours(0);
          setMinutes(0);
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
            <label>
              Godzina:
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="0"
                max="23"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Minuty:
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="0"
                max="59"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Czas trwania:
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
                max="1440"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>Wybór koloru:</label>
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
          <button type="submit">Dodaj wydarzenie</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  
}

export default CreateEvent;

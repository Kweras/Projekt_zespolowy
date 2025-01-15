import { useState } from "react";
import Modal from "react-modal";
import './Event.css';
import { EVENTS_COLORS, formatHour, isEndDateBeforeStartDate, getDurationInMinutes } from "../../utils/calendarUtils";

function MoveEvent({ eventId, name, desc, color, onMoveEvent, children }) { 
  const [polishColor, setPolistColor] = useState("");
  const [start, setStart] = useState("");
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startTime, setStartTime] = useState(formatHour(new Date()));
  const [endTime, setEndTime] = useState(formatHour(new Date()));

  const handleOpenModal = () => {
    setPolistColor(EVENTS_COLORS.find(eventColor => eventColor.nameEnglish === color).namePolish);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const buttonHandleCloseModal = (e) => {
    e.stopPropagation();
    setModalIsOpen(false);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (isEndDateBeforeStartDate(startTime, endTime)) {
      setError("Nieprawidłowy zakres czasu");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/moveEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: localStorage.getItem("userID"),
          _eventId: eventId,
          start: `${start}T${startTime}`,
          duration: getDurationInMinutes(startTime, endTime)
        }),
      });
      if (response.ok) {
        console.log('Event moved!');
        onMoveEvent(eventId);
        handleCloseModal();
      } else {
        setError('Error: Failed to move the event');
      }
    } catch (error) {
      console.error('Error moving event', error);
      setError('Error: Failed to move the event');
    }
  };

  return (
    <div onClick={handleOpenModal}>
      {children}
    
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="modal"
        overlayClassName="overlay"
        appElement={document.getElementById('modalElement')}
      >

      <div className="form-container">
        <h2>Ustaw datę wydarzenia</h2>
        <button type="button" className="close-button" onClick={buttonHandleCloseModal}>CLOSE</button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="event-name"> Nazwa: </label>
            <input
              type="text"
              id="event-name"
              value={name}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-desc">Opis:</label>
            <input
              type="text"
              id="event-desc"
              value={desc}
              readOnly
            />
          </div>   
          <div className="form-group">
            <label htmlFor="event-color">Kolor: </label>
            <input
              type="text"
              id="event-color"
              value={polishColor}
              readOnly
            />            
          </div>
          <div className="form-group">
            <label htmlFor="event-start">Start:</label>
            <input
              type="date"
              id="event-start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Czas:</label>
            <div className="time-container">
              <input type="time" name="start_time" id="start_time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              <span></span>
              <input type="time" name="end_time" id="end_time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>
          
          <button type="submit">Przenieś wydarzenie</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      </Modal>
    </div>
  );
}

export default MoveEvent;

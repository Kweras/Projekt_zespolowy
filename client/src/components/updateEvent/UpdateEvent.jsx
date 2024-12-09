import { useState } from "react";
import Modal from "react-modal";
import './UpdateEvent.css';

function UpdateEvent({eventId, name, desc, color, type, onUpdateEvent, children}) { 
  const [_name, setName] = useState(name);
  const [_desc, setDesc] = useState(desc);
  const [_color, setColor] = useState(color);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const buttonHandleCloseModal = (e) => {
    e.stopPropagation(); //why is this needed
    setModalIsOpen(false);
  };
  
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
          _id: localStorage.getItem("userID"),
          _eventId: eventId,
          updatedEvent: {
            name: _name,
            desc: _desc,
            color: _color
          },
          type: parseInt(type)
        }),
      });
      if (response.ok) {
        console.log('Event updated!');
        onUpdateEvent({ _id: eventId, name: _name, desc: _desc, color: _color });
        handleCloseModal();
      } else {
        setError('Error: Failed to update the event');
      }
    } catch (error) {
      //console.error('Error updating event', error);
      setError('Error: Failed to update the event');
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
      >

      <div className="form-container">
        <h2>Edycja wydarzenia</h2>
        <button type="button" className="close-button" onClick={buttonHandleCloseModal}>CLOSE</button>
        <form onSubmit={handleSubmitEdit}>   
          <div className="form-group">
            <label>
              Nazwa:
              <input
                type="text"
                value={_name}
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
                value={_desc}
                minLength={1}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>Wybór koloru:</label>
            <div className="radio-group">
            <label>
                <input
                  type="radio"
                  value="White"
                  checked={_color === "White"}
                  onChange={(e) => setColor(e.target.value)}
                />
                White
              </label>
              <label>
                <input
                  type="radio"
                  value="Red"
                  checked={_color === "Red"}
                  onChange={(e) => setColor(e.target.value)}
                />
                Red
              </label>
              <label>
                <input
                  type="radio"
                  value="Green"
                  checked={_color === "Green"}
                  onChange={(e) => setColor(e.target.value)}
                />
                Green
              </label>
              <label>
                <input
                  type="radio"
                  value="Blue"
                  checked={_color === "Blue"}
                  onChange={(e) => setColor(e.target.value)}
                />
                Blue
              </label>
            </div>
          </div>
          <button type="submit">Edytuj wydarzenie</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      </Modal>
    </div>
  );
}

export default UpdateEvent;

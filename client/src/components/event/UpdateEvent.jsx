import { useState } from "react";
import Modal from "react-modal";
import './Event.css';
import ColorPicker from "../ui/ColorPicker/ColorPicker";

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
        appElement={document.getElementById('modalElement')}
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
              <ColorPicker setColor={setColor} value={_color} />
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

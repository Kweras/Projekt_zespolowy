import { useState } from "react";
import Modal from "react-modal";
import './Event.css';
import { IoMdClose } from "react-icons/io";

function DeleteEvent({ eventId, name, type, onDeleteEvent, children }) {
  const [error, setError] = useState('');
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
          _id: localStorage.getItem("userID"),
          _eventId: eventId,
          type: parseInt(type)
        }),
      });
      if (response.ok) {
        onDeleteEvent(eventId);
        handleCloseModal();
      } else {
        setError('Error: Failed to delete the event');
      }
    } catch (error) {
      console.error('Error deleting event', error);
      setError('Error: Failed to delete event');
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

          <form onSubmit={handleSubmitDelete}>
            <button type="button" className="close-button" onClick={buttonHandleCloseModal}><IoMdClose /></button>

            <h3 className="delete-info">Czy na pewno chcesz usunąć to wydarzenie?</h3>
            <h2>{name}</h2>
            <br></br>
            <button type="submit" className="login-btn">Usuń</button>
            {/* <button type="button" onClick={buttonHandleCloseModal}>Nie</button> */}




          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </Modal>
    </div>
  );
}

export default DeleteEvent;

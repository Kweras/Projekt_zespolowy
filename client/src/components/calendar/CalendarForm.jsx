import React from 'react'
import CreateEvent from '../event/CreateEvent'

export default function CalendarForm({ startDate, appendEvent, time, hideModal }) {
  const handleModalClose = (event) => {
    if (event.nativeEvent.target.classList.contains('calendar-modal-container')) {
      hideModal()
    }
  }

  const closeModal = () => {
    hideModal();
  }

  return (
    <div className='calendar-modal-container' onClick={handleModalClose}>
      <div className='calendar-modal'>
        <CreateEvent start={startDate} time={time} type={"withDate"} appendEvent={appendEvent} closeModal={closeModal} />
      </div>
    </div>
  )
}

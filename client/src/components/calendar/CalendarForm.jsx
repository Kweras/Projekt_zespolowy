import React from 'react'
import CreateEvent from '../event/CreateEvent'

export default function CalendarForm({ startDate, hideModal }) {
  const handleModalClose = (event) => {
    if (event.nativeEvent.target.classList.contains('calendar-modal-container')) {
      hideModal()
    }
  }

  return (
    <div className='calendar-modal-container' onClick={handleModalClose}>
      <div className='calendar-modal'>
        <CreateEvent start={startDate} type={"withDate"}/>
      </div>
    </div>
  )
}

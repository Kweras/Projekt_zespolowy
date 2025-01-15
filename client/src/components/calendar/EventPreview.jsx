import React from 'react'
import { EVENTS_COLORS, formatDateToPolish, formatHour } from '../../utils/calendarUtils';

export default function EventPreview({ hideModal, event }) {
  if (!event) {
    hideModal();
  }

  const handleModalClose = (e) => {
    if (e.nativeEvent.target.classList.contains('calendar-modal-container')) {
      hideModal()
    }
  }

  let eventColor = EVENTS_COLORS.find(color => color.nameEnglish === event.color);
  let startDate = new Date(event.start);
  let endDate = new Date(startDate.getTime());
  endDate.setMinutes(endDate.getMinutes() + event.duration);

  if (!eventColor) eventColor = EVENTS_COLORS[0];

  return (
    <div className='calendar-modal-container' onClick={handleModalClose}>
      <div className='calendar-modal event-preview'>
        <header>
          <div className="color-dot"
            style={{
              backgroundColor: eventColor.hex
            }}
          ></div>
          <aside>
            <h3>{event.name}</h3>
            <p>{formatDateToPolish(startDate)} • {formatHour(startDate)} - {formatHour(endDate)}</p>
          </aside>
        </header>
        <p>{event.desc}</p>
      </div>
    </div>
  )
}

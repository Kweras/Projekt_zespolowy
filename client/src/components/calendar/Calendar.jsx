import "./Calendar.css"
import "../common/eventStyle.css"

import MonthView from "./MonthView"
import WeekView from './WeekView'

export default function Calendar({ isLoading, setPreviewEvent, selectedView, currentDate, events, handleModalOpen }) {  
  return (
    <div className='calendar-page-container'>
      {isLoading && <div className="calendarLoadingIndicator"><div className="loader"></div></div>}
      {selectedView === "week" ? <WeekView currentDate={currentDate} setPreviewEvent={setPreviewEvent} events={events} handleModalOpen={handleModalOpen} /> : <MonthView currentDate={currentDate} setPreviewEvent={setPreviewEvent} events={events} handleModalOpen={handleModalOpen} />}
    </div>
  )
}
  
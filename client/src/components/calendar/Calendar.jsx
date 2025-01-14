import "./Calendar.css"
import MonthView from "./MonthView"
import WeekView from './WeekView'

export default function Calendar({ isLoading, selectedView, currentDate, events, handleModalOpen }) {  
  return (
    <div className='calendar-page-container'>
      {isLoading && <div className="calendarLoadingIndicator"><div class="loader"></div></div>}
      {selectedView === "week" ? <WeekView currentDate={currentDate} events={events} handleModalOpen={handleModalOpen} /> : <MonthView currentDate={currentDate} events={events} handleModalOpen={handleModalOpen} />}
    </div>
  )
}
  
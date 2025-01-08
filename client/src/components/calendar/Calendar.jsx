import "./Calendar.css"
import MonthView from "./MonthView"
import WeekView from './WeekView'

export default function Calendar({ selectedView, currentDate, events, handleModalOpen }) {  
  return (
    <div className='calendar-page-container'>
      {selectedView === "week" ? <WeekView currentDate={currentDate} events={events} handleModalOpen={handleModalOpen} /> : <MonthView currentDate={currentDate} events={events} handleModalOpen={handleModalOpen} />}
    </div>
  )
}

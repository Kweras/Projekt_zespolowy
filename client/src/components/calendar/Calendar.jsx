import "./Calendar.css"
import MonthView from "./MonthView"
import WeekView from './WeekView'

export default function Calendar({ selectedView, currentDate, events }) {
  console.log(events);
  
  return (
    <div className='calendar-page-container'>
      {selectedView === "week" ? <WeekView currentDate={currentDate} events={events} /> : <MonthView  currentDate={currentDate} events={events}/>}
    </div>
  )
}

import "./Calendar.css"
import MonthView from "./MonthView"
import WeekView from './WeekView'

export default function Calendar({ selectedView, currentDate }) {
  return (
    <div className='calendar-page-container'>
      {selectedView === "week" ? <WeekView currentDate={currentDate}/> : <MonthView  currentDate={currentDate}/>}
    </div>
  )
}

import "./Calendar.css"
import WeekView from './WeekView'

export default function Calendar({ selectedView, currentDate }) {
  return (
    <div className='calendar-page-container'>
      {selectedView === "week" ? <WeekView currentDate={currentDate}/> : <p>month</p>}
    </div>
  )
}

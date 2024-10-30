import "./Calendar.css"
import WeekView from './WeekView'

export default function Calendar({ selectedView }) {
  return (
    <div className='calendar-page-container'>
      {selectedView === "week" ? <WeekView/> : <p>month</p>}
    </div>
  )
}

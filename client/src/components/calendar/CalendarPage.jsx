import { useState } from "react";
import Calendar from "./Calendar";
import "./Calendar.css"


const CalendarPage = () => {
  const [selectedView, setSelectedView] = useState("week");
  // const [currentRange, setCurrentRange] = 

  return (
  <div className='calendar-page-container'>
    <div className="buttons-group">
      <button onClick={() => setSelectedView("week")} className={selectedView === "week" && "active"}>Week</button>
      <button onClick={() => setSelectedView("month")} className={selectedView === "month" && "active"}>Month</button>
    </div>

    <header className="calendar-header">

    </header>  
      
    
    <Calendar selectedView={selectedView}/>
  </div>
  )
}

export default CalendarPage;
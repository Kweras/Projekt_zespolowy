import { useState } from "react";
import Calendar from "./Calendar";
import "./Calendar.css"
import { getTitle } from "../../utils/calendarUtils";


const CalendarPage = () => {
  const [selectedView, setSelectedView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeRange = (type) => {
    if (type === "today") {
      setCurrentDate(new Date());
      return
    } 

    let direction = type === "next" ? 1 : -1;
    let newDate;

    if (selectedView === 'week') {
      newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (7 * direction))
      setCurrentDate(newDate);
    } else {
      newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + (1 * direction), 1)
      setCurrentDate(newDate);
    }
    
    console.log(getTitle(newDate, selectedView));
  }

  return (
  <div className='calendar-page-container'>
    <div className="buttons-group">
      <button onClick={() => setSelectedView("week")} className={selectedView === "week" ? "active" : ""}>Tydzień</button>
      <button onClick={() => setSelectedView("month")} className={selectedView === "month" ? "active" : ""}>Miesiąc</button>
    </div>

    <header className="calendar-header">
        <p>{getTitle(currentDate, selectedView)}</p>

        <div className="buttons-container">
          <button className="square" onClick={() => changeRange("prev")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15.5298 4.22032C15.6703 4.36094 15.7492 4.55157 15.7492 4.75032C15.7492 4.94907 15.6703 5.13969 15.5298 5.28032L8.80983 12.0003L15.5298 18.7203C15.6035 18.789 15.6626 18.8718 15.7036 18.9638C15.7446 19.0558 15.7666 19.1551 15.7684 19.2558C15.7702 19.3565 15.7517 19.4565 15.714 19.5499C15.6762 19.6433 15.6201 19.7281 15.5489 19.7994C15.4776 19.8706 15.3928 19.9267 15.2994 19.9644C15.206 20.0022 15.106 20.0207 15.0053 20.0189C14.9046 20.0171 14.8053 19.9951 14.7133 19.9541C14.6213 19.9131 14.5385 19.854 14.4698 19.7803L7.21983 12.5303C7.07938 12.3897 7.00049 12.1991 7.00049 12.0003C7.00049 11.8016 7.07938 11.6109 7.21983 11.4703L14.4698 4.22032C14.6105 4.07987 14.8011 4.00098 14.9998 4.00098C15.1986 4.00098 15.3892 4.07987 15.5298 4.22032Z" fill="black"/>
            </svg>
          </button>
          <button onClick={() => changeRange("today")}>Dzisiaj</button>
          <button className="square" onClick={() => changeRange("next")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.47015 4.22032C8.3297 4.36094 8.25081 4.55157 8.25081 4.75032C8.25081 4.94907 8.3297 5.13969 8.47015 5.28032L15.1902 12.0003L8.47015 18.7203C8.39647 18.789 8.33736 18.8718 8.29637 18.9638C8.25538 19.0558 8.23334 19.1551 8.23156 19.2558C8.22979 19.3565 8.24831 19.4565 8.28603 19.5499C8.32375 19.6433 8.3799 19.7281 8.45112 19.7994C8.52233 19.8706 8.60717 19.9267 8.70056 19.9644C8.79394 20.0022 8.89397 20.0207 8.99468 20.0189C9.09538 20.0171 9.19469 19.9951 9.28669 19.9541C9.37869 19.9131 9.46149 19.854 9.53015 19.7803L16.7802 12.5303C16.9206 12.3897 16.9995 12.1991 16.9995 12.0003C16.9995 11.8016 16.9206 11.6109 16.7802 11.4703L9.53015 4.22032C9.38953 4.07987 9.1989 4.00098 9.00015 4.00098C8.8014 4.00098 8.61078 4.07987 8.47015 4.22032Z" fill="black"/>
            </svg>  
          </button>
        </div>
    </header>  
      
    
      <Calendar selectedView={selectedView} currentDate={currentDate} />
  </div>
  )
}

export default CalendarPage;
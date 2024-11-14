import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import "./Calendar.css"
import { getTitle } from "../../utils/calendarUtils";

const TEMP_EVENTS = [
  {
    id: 1,
    name: 'Test Event',
    start: new Date('2024-11-13'),
    duration: '120'
  }
]

const CalendarPage = () => {
  const [selectedView, setSelectedView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([])

  useEffect(() => {
    const options = JSON.parse(localStorage.getItem('calendar-options'))

    if (options.view) {
      setSelectedView(options.view)
    }

    if (options.date) {
      setCurrentDate(new Date(options.date))
    }
    

    // TODO: Send request to the server
    setEvents(TEMP_EVENTS)
  }, []);

  const updateLocalStorage = (view, date) => {
    localStorage.setItem('calendar-options', JSON.stringify({
      view, date
    }))
  }

  const changeRange = (type) => {
    if (type === "today") {
      setCurrentDate(new Date());
      updateLocalStorage(selectedView, new Date());
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

    updateLocalStorage(selectedView, newDate);
  }

  const handleChangeView = (view) => {
    setSelectedView(view);
        updateLocalStorage(view, currentDate);
  }

  return (
      <div className='calendar-page-container'>
      <header className="calendar-header">
        <div className="calendar-header-title">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{cursor: "pointer"}} onClick={() => {
                const currentYear = new Date().getFullYear();
                const startOfYear = new Date(currentYear, 0, 1);
                const endOfYear = new Date(currentYear, 11, 31); 
                const randomTimestamp = startOfYear.getTime() + Math.random() * (endOfYear.getTime() - startOfYear.getTime());
                setCurrentDate(new Date(randomTimestamp))
          }}>
            <path d="M17.75 3C18.612 3 19.4386 3.34241 20.0481 3.9519C20.6576 4.5614 21 5.38805 21 6.25V17.75C21 18.612 20.6576 19.4386 20.0481 20.0481C19.4386 20.6576 18.612 21 17.75 21H6.25C5.38805 21 4.5614 20.6576 3.9519 20.0481C3.34241 19.4386 3 18.612 3 17.75V6.25C3 5.38805 3.34241 4.5614 3.9519 3.9519C4.5614 3.34241 5.38805 3 6.25 3H17.75ZM19.5 8.5H4.5V17.75C4.5 18.716 5.284 19.5 6.25 19.5H17.75C18.2141 19.5 18.6592 19.3156 18.9874 18.9874C19.3156 18.6592 19.5 18.2141 19.5 17.75V8.5ZM7.75 14.5C8.08152 14.5 8.39946 14.6317 8.63388 14.8661C8.8683 15.1005 9 15.4185 9 15.75C9 16.0815 8.8683 16.3995 8.63388 16.6339C8.39946 16.8683 8.08152 17 7.75 17C7.41848 17 7.10054 16.8683 6.86612 16.6339C6.6317 16.3995 6.5 16.0815 6.5 15.75C6.5 15.4185 6.6317 15.1005 6.86612 14.8661C7.10054 14.6317 7.41848 14.5 7.75 14.5ZM12 14.5C12.3315 14.5 12.6495 14.6317 12.8839 14.8661C13.1183 15.1005 13.25 15.4185 13.25 15.75C13.25 16.0815 13.1183 16.3995 12.8839 16.6339C12.6495 16.8683 12.3315 17 12 17C11.6685 17 11.3505 16.8683 11.1161 16.6339C10.8817 16.3995 10.75 16.0815 10.75 15.75C10.75 15.4185 10.8817 15.1005 11.1161 14.8661C11.3505 14.6317 11.6685 14.5 12 14.5ZM7.75 10.5C8.08152 10.5 8.39946 10.6317 8.63388 10.8661C8.8683 11.1005 9 11.4185 9 11.75C9 12.0815 8.8683 12.3995 8.63388 12.6339C8.39946 12.8683 8.08152 13 7.75 13C7.41848 13 7.10054 12.8683 6.86612 12.6339C6.6317 12.3995 6.5 12.0815 6.5 11.75C6.5 11.4185 6.6317 11.1005 6.86612 10.8661C7.10054 10.6317 7.41848 10.5 7.75 10.5ZM12 10.5C12.3315 10.5 12.6495 10.6317 12.8839 10.8661C13.1183 11.1005 13.25 11.4185 13.25 11.75C13.25 12.0815 13.1183 12.3995 12.8839 12.6339C12.6495 12.8683 12.3315 13 12 13C11.6685 13 11.3505 12.8683 11.1161 12.6339C10.8817 12.3995 10.75 12.0815 10.75 11.75C10.75 11.4185 10.8817 11.1005 11.1161 10.8661C11.3505 10.6317 11.6685 10.5 12 10.5ZM16.25 10.5C16.5815 10.5 16.8995 10.6317 17.1339 10.8661C17.3683 11.1005 17.5 11.4185 17.5 11.75C17.5 12.0815 17.3683 12.3995 17.1339 12.6339C16.8995 12.8683 16.5815 13 16.25 13C15.9185 13 15.6005 12.8683 15.3661 12.6339C15.1317 12.3995 15 12.0815 15 11.75C15 11.4185 15.1317 11.1005 15.3661 10.8661C15.6005 10.6317 15.9185 10.5 16.25 10.5ZM17.75 4.5H6.25C5.78587 4.5 5.34075 4.68437 5.01256 5.01256C4.68437 5.34075 4.5 5.78587 4.5 6.25V7H19.5V6.25C19.5 5.78587 19.3156 5.34075 18.9874 5.01256C18.6592 4.68437 18.2141 4.5 17.75 4.5Z" fill="black"/>
          </svg>

          <p>{getTitle(currentDate, selectedView)}</p>
        </div>

        <div className="buttons-group-container">
          <div className="buttons-group">
            <button onClick={() => handleChangeView("week")} className={selectedView === "week" ? "active" : ""}>Tydzień</button>
            <button onClick={() => handleChangeView("month")} className={selectedView === "month" ? "active" : ""}>Miesiąc</button>
          </div>
        </div>
        
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
      
    
      <Calendar selectedView={selectedView} currentDate={currentDate} events={events} />
  </div>
  )
}

export default CalendarPage;
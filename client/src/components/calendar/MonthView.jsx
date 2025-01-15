import React from 'react';
import { polishDayOfWeek, isToday, areDatesEqual, formatHour, fixTextWidth, formatDateToYYYYMMDD } from '../../utils/calendarUtils';

const MonthView = ({ currentDate,setPreviewEvent, events, handleModalOpen }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = new Date(firstDayOfMonth);
  const dayOfWeek = firstDayOfMonth.getDay();

  // Set to previous Monday if not Monday
  startDay.setDate(firstDayOfMonth.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); 

  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (7 - endDay.getDay()) % 7);

  // Generate an array of dates for the calendar
  const days = [];

  for (let date = new Date(startDay); date <= endDay; date.setDate(date.getDate() + 1)) {
    const obj = {
      date: new Date(date), 
      events: []
    }

    events.forEach(event => {         
      if (areDatesEqual(date, new Date(event.start))) {
        obj.events.push(event);        
      }
    });

    days.push(obj);
  }  

  const handleDayClick = (e) => {
    const event = e.nativeEvent;

    if (!(event.target.classList.contains('month-calendar-day') || event.target.classList.contains('month-calendar-date'))) {
      return;
    }
    const date = event.target.dataset.date;    
    handleModalOpen(date);
  }

  return (
    <div className="month-calendar">
      <CalendarHeader />      

      {days.map(({date, events}, index) => (
        <div
          key={index}
          data-date={formatDateToYYYYMMDD(date)}
          onClick={handleDayClick}
          className={`month-calendar-day ${[0, 6].includes(date.getDay()) && 'gray'} ${date.getDay() === 0 && 'last'} ${date.getMonth() === month ? 'month-calendar-current-month' : 'month-calendar-other-month'}`}
        >
          <span data-date={formatDateToYYYYMMDD(date)} className={isToday(date) ? 'today month-calendar-date' : 'month-calendar-date'}>{date.getDate()}</span>
          <DayEvents events={events} setPreviewEvent={setPreviewEvent} />
        </div>
      ))}
    </div>
  );
};


const CalendarHeader = () => {
  return <>
    {polishDayOfWeek.map((day) => (
      <div key={day} className={`month-calendar-day-header`}>
      {day}
      </div>
    ))}

    {polishDayOfWeek.map((day) => (
      <div key={day} className={`month-calendar-day-header-helper ${day === 'Niedz.' && 'last'}`}>
      </div>
    ))}
  </>
}

const DayEvents = ({ events, setPreviewEvent }) => {
  if (events.length === 0) return;

  return (
    <>
      {events.map(event => {
        let isPartDay = !(event.duration > 0);
        
        return (<div key={event._id} className={`month-event event-${event.color}`} onClick={() => {setPreviewEvent(event)}}>
          <p>{fixTextWidth(event.name, 20)}</p>
          {!isPartDay && <p>{formatHour(new Date(event.start))}</p>}
        </div>)
      }
      )}
    </>
  )
}

export default MonthView;

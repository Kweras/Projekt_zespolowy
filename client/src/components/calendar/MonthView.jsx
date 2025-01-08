import React from 'react';
import { shortMonths, polishDayOfWeek, isToday, areDatesEqual } from '../../utils/calendarUtils';

const MonthView = ({ currentDate, events }) => {
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
  const daysEvents = [];

  for (let date = new Date(startDay); date <= endDay; date.setDate(date.getDate() + 1)) {
    const obj = {
      date: new Date(date), 
      events: []
    }

    events.forEach(event => {
      if (areDatesEqual(date, event.start)) {
        obj.events.push(event);
        console.log(event, obj.date);
        
      }
    });

    days.push(obj);
  }

  console.log(days, events);
  

  return (
    <div className="month-calendar">
      <CalendarHeader />      

      {days.map(({date, events}, index) => (
        <div
          key={index}
          className={`month-calendar-day ${[0, 6].includes(date.getDay()) && 'gray'} ${date.getDay() === 0 && 'last'} ${date.getMonth() === month ? 'month-calendar-current-month' : 'month-calendar-other-month'}`}
        >
          <span className={isToday(date) ? 'today' : ''}>{date.getDate()}</span>
          <DayEvents events={events}/>
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

const DayEvents = ({ events }) => {
  if (events.length === 0) return;

  return (
    <>
      {events.map(event =>
        <div className={`month-event event-${event.color}`}>{event.name}</div>
      )}
    </>
  )
}

export default MonthView;

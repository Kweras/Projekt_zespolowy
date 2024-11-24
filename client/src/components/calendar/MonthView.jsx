import React from 'react';
import { shortMonths, polishDayOfWeek, isToday } from '../../utils/calendarUtils';

const MonthView = ({ currentDate }) => {
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
    days.push(new Date(date));
  }

  return (
    <div className="month-calendar">
      <CalendarHeader />      

      {days.map((date, index) => (
        <div
          key={index}
          className={`month-calendar-day ${[0, 6].includes(date.getDay()) && 'gray'} ${date.getDay() === 0 && 'last'} ${date.getMonth() === month ? 'month-calendar-current-month' : 'month-calendar-other-month'}`}
        >
          <span className={isToday(date) ? 'today' : ''}>{date.getDate()}</span>
          {[10, 14, 7].includes(index) && <div className="month-event">Test</div>}
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

export default MonthView;

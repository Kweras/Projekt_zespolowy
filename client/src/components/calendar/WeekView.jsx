import React, { useEffect, useRef } from 'react'
import { getScrollbarWidth } from '../../utils/getScrollbarWidth';
import { getDaysOfTheWeek } from '../../utils/getDaysOfTheWeek';
import { getWeekNumber } from '../../utils/getWeekNumber';
import { getPolishDayOfWeek } from '../../utils/getPolishWeekDays';


export default function WeekView({ currentDate }) {
  const hoursContainerRef = useRef(null);
  const scrollBarWidth = getScrollbarWidth();
  const gridColumnsWithoutScrollbar = `50px 10px 1fr 1fr 1fr 1fr 1fr 1fr 1fr ${scrollBarWidth}px`;
  const daysOfTheWeek = getDaysOfTheWeek(getWeekNumber(currentDate), currentDate.getFullYear());

  const daysElement = daysOfTheWeek.map(day => {
    return (<div className="day-container" key={day.getTime()}>{getPolishDayOfWeek(day)} <span>{day.getDate()}</span></div>)
  });

  const now = new Date();
  const nowElementTop = (now.getHours()) * 50 + (now.getMinutes() * (50 / 60));

  useEffect(() => {
    const now = new Date();

    if (hoursContainerRef) {
      hoursContainerRef.current.scrollTo({
        top: (now.getHours() - 1) * 50,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="week-view-container" >
      <header style={{gridTemplateColumns: gridColumnsWithoutScrollbar}}>
        <div></div>
        <div></div>
        { daysElement }
        <div></div>
      </header>

      <div className="all-day-event-container" style={{gridTemplateColumns: gridColumnsWithoutScrollbar}}>
        <div className="time-container">All day</div>
        <div></div>
        <div className="all-day-event"></div>
        <div className="all-day-event"></div>
        <div className="all-day-event"></div>
        <div className="all-day-event"></div>
        <div className="all-day-event"></div>
        <div className="all-day-event"></div>
        <div className="all-day-event"></div>
        <div></div>
      </div>

      <div className="days-container" ref={hoursContainerRef}>
        <div className="hours-container">
          <div><span>01:00</span></div>
          <div><span>02:00</span></div>
          <div><span>03:00</span></div>
          <div><span>04:00</span></div>
          <div><span>05:00</span></div>
          <div><span>06:00</span></div>
          <div><span>07:00</span></div>
          <div><span>08:00</span></div>
          <div><span>09:00</span></div>
          <div><span>10:00</span></div>
          <div><span>11:00</span></div>
          <div><span>12:00</span></div>
          <div><span>13:00</span></div>
          <div><span>14:00</span></div>
          <div><span>15:00</span></div>
          <div><span>16:00</span></div>
          <div><span>17:00</span></div>
          <div><span>18:00</span></div>
          <div><span>19:00</span></div>
          <div><span>20:00</span></div>
          <div><span>21:00</span></div>
          <div><span>22:00</span></div>
          <div><span>23:00</span></div>
        </div>
        <div className="dashes-container">
          <SpamOfDivs />
        </div>
        <div className="day-events">
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events">
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events">
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events">
          <div className="now-element" style={{top: `${nowElementTop}px`}}></div>
          <div className="event" style={{ top: `${50 * 14}px`, height: `${50 * 4}px`}}>Projekt zespołowy</div>
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events">
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events">
          <div className='event'> test</div>
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events">
          <SpamOfDivs />
          <div></div>
        </div>
      </div>
    </div>
  )
}

const SpamOfDivs = () => {
  return (
    <>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </>
  )
}
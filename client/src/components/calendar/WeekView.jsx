import React, { useEffect, useRef, useState } from 'react'
import { getScrollbarWidth } from '../../utils/getScrollbarWidth';
import { getDaysOfTheWeek } from '../../utils/getDaysOfTheWeek';
import { getWeekNumber } from '../../utils/getWeekNumber';
import { getPolishDayOfWeek } from '../../utils/getPolishWeekDays';


export default function WeekView({ currentDate }) {
  const hoursContainerRef = useRef(null);
  const dayColumnRef = useRef(null);
  const [hourIndicator, setHourIndicator] = useState({}); 

  const scrollBarWidth = getScrollbarWidth();
  const gridColumnsWithoutScrollbar = `50px 10px 1fr 1fr 1fr 1fr 1fr 1fr 1fr ${scrollBarWidth}px`;

  const daysOfTheWeek = getDaysOfTheWeek(getWeekNumber(currentDate), currentDate.getFullYear());

  const daysElement = daysOfTheWeek.map(day => {
    return (<div className="day-container" key={day.getTime()}>{getPolishDayOfWeek(day)} <span>{day.getDate()}</span></div>)
  });

  useEffect(() => {
    const now = new Date();

    if (hoursContainerRef) {
      hoursContainerRef.current.scrollTo({
        top: (now.getHours() - 1) * 50,
        behavior: 'smooth',
      });
    }

    if (dayColumnRef) {
      const day = now.getDay();
      const weekDay = day === 0 ? 7 : day;
      
      const todayAtMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const isTodayInRange = daysOfTheWeek.filter(el => el.getTime() === todayAtMidnight.getTime());
      
      setHourIndicator(() => ({
        top: (now.getHours()) * 50 + (now.getMinutes() * (50 / 60)),
        width: dayColumnRef.current.offsetWidth,
        left: dayColumnRef.current.offsetWidth * (weekDay - 1),
        display: isTodayInRange.length > 0 ? 'block' : 'none'
      }))
    }
  }, [currentDate]);

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


        <div className="day-events" data-day="monday" ref={dayColumnRef}>
          {<HourIndicator {...hourIndicator} />}
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="tuesday">
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="wednesday">
          <div className="event" style={{ top: `${50 * 14}px`, height: `${50 * 4}px` }}>Projekt zespołowy</div>
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="thursday">
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="friday">
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="saturday">
          <div className='event'> test</div>
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="sunday">
          <SpamOfDivs />
          <div></div>
        </div>
      </div>
    </div>
  )
}

const HourIndicator = ({top, left, width, display}) => {  
  return (
    <div className="now-element" style={{ width: `${width}px`, top: `${top}px`, left: `${left}px`, display }}></div>
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
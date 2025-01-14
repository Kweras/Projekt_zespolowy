import React, { useEffect, useRef, useState } from 'react'
import { getScrollbarWidth } from '../../utils/getScrollbarWidth';
import { formatDateToYYYYMMDD, getDaysOfTheWeek, getPolishDayOfWeek, getWeekNumber } from '../../utils/calendarUtils';


export default function WeekView({ currentDate, events, handleModalOpen }) {
  const hoursContainerRef = useRef(null);
  const dayColumnRef = useRef(null);
  const [hourIndicator, setHourIndicator] = useState({}); 

  const scrollBarWidth = getScrollbarWidth();
  const gridColumnsWithoutScrollbar = `50px 10px 1fr 1fr 1fr 1fr 1fr 1fr 1fr ${scrollBarWidth}px`;

  const daysOfTheWeek = getDaysOfTheWeek(getWeekNumber(currentDate), currentDate.getFullYear());
  
  const handleDayClickHeader = (event) => {
    handleModalOpen(event.nativeEvent.target.dataset.date);
  }

  const daysElement = daysOfTheWeek.map(day => {
    return (<div className="day-container" onClick={handleDayClickHeader} data-date={formatDateToYYYYMMDD(day)} key={day.getTime()}>{getPolishDayOfWeek(day)} <span style={{pointerEvents: 'none'}}>{day.getDate()}</span></div>)
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

  const allDayEvents = [[], [], [], [], [], [], []];
  const dayEvents = [[], [], [], [], [], [], []];

  events.forEach(event => {
    event.start = new Date(event.start)
    let weekDay = event.start.getDay();
    if (weekDay === 0) weekDay = 7;
    // If there is no duration, event is full day.
    if (event.duration === undefined) {
      allDayEvents[weekDay - 1].push(event);
    } else {
      const hours = Math.floor(+event.duration / 60);
      const minutes = event.duration % 60;
      const startedQuarters = Math.ceil(minutes / 15);

      dayEvents[weekDay - 1].push({
        ...event,
        topPosition: `${(50 * event.start.getHours()) + (Math.floor(event.start.getMinutes() / 15)) * (50/4)}px`,
        height: `${(50 * hours) + (startedQuarters * (50/4))}px`
      });
    }
  });

  const allDayEventsContainer = allDayEvents.map(el => <AllDayEvent key={Math.random()} events={el} />)

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
        {allDayEventsContainer}
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
          <DayEvents events={dayEvents[0]} />
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="tuesday">
          <DayEvents events={dayEvents[1]} />
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="wednesday">
          <DayEvents events={dayEvents[2]} />
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="thursday">
          <DayEvents events={dayEvents[3]} />
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="friday">
          <DayEvents events={dayEvents[4]} />
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="saturday">
          <DayEvents events={dayEvents[5]} />
          <SpamOfDivs />
          <div></div>
        </div>
        <div className="day-events" data-day="sunday">
          <DayEvents events={dayEvents[6]} />
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

const AllDayEvent = ({events}) => {
  return (
    <div className='all-day-event'>
      {events.map(event => <div key={event.id} className={`event-${event.color}`}>{event.name}</div>)}
    </div>
  )
}

const DayEvents = ({ events }) => {
  if (events.length === 0) return;

  return (
    <>
      {events.map(event =>
        <div key={event._id} className={`week-event event-${event.color}`} style={{ top: event.topPosition, height: event.height }}>{event.name}</div>
      )}
    </>
  )
}
import '../event/Event.css';
import UpdateEvent from '../updateEvent/UpdateEvent';
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const Event = ({ id, name, desc, color }) => {
  let eventClassName = 'event';

  if (color === 'Red') {
    eventClassName += ' red-event';
  } else if (color === 'Green') {
    eventClassName += ' green-event';
  } else if (color === 'Blue') {
    eventClassName += ' blue-event';
  } else {
    eventClassName += ' white-event';
  }

  return (
    <div className={eventClassName}>
      <div className="icon-container">
        <UpdateEvent 
          className="icon" 
          eventId={id} 
          name={name} 
          desc={desc} 
          color={color} 
          type="0"
        >
          <FaPencilAlt className="icon"/>
        </UpdateEvent>
        
        <ImBin className="icon"/>
      </div>
      <h2 className="name" >{name}</h2>
      <p className="desc">{desc}</p>
    </div>
  );
};

export default Event;
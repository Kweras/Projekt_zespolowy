import '../event/Event.css';

import UpdateEvent from './UpdateEvent';
import DeleteEvent from './DeleteEvent';
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const Event = ({ id, name, desc, color, onUpdateEvent, onDeleteEvent }) => {
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
          eventId={id} 
          name={name} 
          desc={desc} 
          color={color} 
          type="0"
          onUpdateEvent={onUpdateEvent}
        >
          <FaPencilAlt/>
        </UpdateEvent>

        <DeleteEvent
          eventId={id} 
          name={name} 
          type="0"
          onDeleteEvent={onDeleteEvent}
        >
          <ImBin/>
        </DeleteEvent>
      </div>
      <h2 className="name" >{name}</h2>
      <p className="desc">{desc}</p>
    </div>
  );
};

export default Event;
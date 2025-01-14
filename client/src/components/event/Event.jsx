import '../event/Event.css';
import '../common/eventStyle.css'

import UpdateEvent from './UpdateEvent';
import DeleteEvent from './DeleteEvent';
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const Event = ({ id, name, desc, color, onUpdateEvent, onDeleteEvent }) => {
  return (
    <div className={`event event-${color}`}>
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
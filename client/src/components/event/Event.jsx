import '../event/Event.css';
import '../common/eventStyle.css'

import UpdateEvent from './UpdateEvent';
import DeleteEvent from './DeleteEvent';
import MoveEvent from './MoveEvent';
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { MdDateRange } from "react-icons/md";


const Event = ({ id, name, desc, color, onUpdateEvent, onDeleteEvent, onMoveEvent }) => {
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

        <MoveEvent
          eventId={id} 
          name={name} 
          desc={desc} 
          color={color} 
          onMoveEvent={onMoveEvent}
        >
          <MdDateRange />
        </MoveEvent>
        
      </div>
      <h2 className="name" >{name}</h2>
      <p className="desc">{desc}</p>
    </div>
  );
};

export default Event;
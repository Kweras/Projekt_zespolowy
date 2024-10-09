import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";


function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [nick, setNick]= useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventColor, setEventColor] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((res) => {
      setListOfUsers(res.data);
    }) 
    //reference to ExpressJS GET
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {nick, email, password})
    .then((res) => {
      console.log("User added");
      setListOfUsers([...listOfUsers, {nick, email, password}]);
    });
  }

  const createEvent = (userId) => {
    const event = { name: eventName, desc: eventDesc, color: eventColor };
    Axios.post("http://localhost:3001/createEvent", { _id: userId, event })
      .then((res) => {
        const updatedUsers = listOfUsers.map((user) => 
          user._id === userId ? { ...user, events: res.data } : user
        );
        setListOfUsers(updatedUsers);
      });
  };



  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div style={{ paddingTop: '10px'}}>
              <h1>Nick: {user.nick}</h1>
              <h2>Email: {user.email}</h2>
              <h2>Password: {user.password}</h2>
              { user.events && user.events.length > 0 ? (
                user.events.map((event) => (
                  <div>
                    <h4>Event Name: {event.name}</h4>
                    <p>Description: {event.desc}</p>
                    <p>Color: {event.color}</p>
                  </div>
                ))
              ) : (
                <p>No events available.</p>
              )}
              <div>
                <input 
                  type="text" 
                  placeholder="Event Name" 
                  value={eventName}
                  onChange={(event) => setEventName(event.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Description" 
                  value={eventDesc}
                  onChange={(event) => setEventDesc(event.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Color" 
                  value={eventColor}
                  onChange={(event) => setEventColor(event.target.value)} 
                />
                <button type="button" onClick={() => createEvent(user._id)}>Add Event</button>
              </div>
              <hr />
            </div> 
          );
        })}
      </div>
      <hr />
      <div>
        <input type="text" placeholder="nick" onChange={(event) => {setNick(event.target.value);}} />
        <input type="text" placeholder="email" onChange={(event) => {setEmail(event.target.value);}} />
        <input type="text" placeholder="password" onChange={(event) => {setPassword(event.target.value);}} />
        <button type="button" onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;

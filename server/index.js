const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UserModel } = require("./models/user");

require('dotenv').config();

const cors = require('cors');
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);

app.listen(3001, () => {
  console.log("Server is running with nodemon");
});



//Rejestracja

app.post('/register', async (req, res) => {
  try {
    const { nick, email, password } = req.body;
    const e = await UserModel.findOne({ email });
    if (e != null) {
      if (e.email == email) {
        throw new Error("User with this email already exists!")
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ nick, email, password: hashedPassword });
    await user.save();
    console.log(req.body)
    res.status(201).send('Account created');
  } catch (error) {
    res.status(500).send('Error: ' + console.error(error));
  }
});

//Logowanie
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid username or password');
    }

    //console.log(user)
    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).send('Error logging in');
  }
});

app.post("/createEvent", async (req, res) => {
  const { _id, event } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { $push: { events: event } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    return res.status(200).send('Event created.');

  } catch (error) {
    console.log(error);
    return res.status(500).send('Error');
  }
});

app.get("/getEvents", async (req, res) => {
  const { _id, type } = req.query;

  if (!_id) {
    return res.status(400).send('Missing parameters!');
  }

  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).send('User not found!');
    }
    if(type == 0){
      return res.status(200).json({
        events: user.events
      });
    }
    else{
      return res.status(200).json({
        dated_events: user.dated_events
      });
    }
    
  } catch (error) {
    console.error("Error retrieving events:", error);
    return res.status(500).send('ERROR!!!');
  }
});



app.post("/updateEvent", async (req, res) => {
  const { _id, _eventId, updatedEvent, type } = req.body;

  if (!_id || !_eventId || !updatedEvent || (type !== 0 && type !== 1)) {
    return res.status(400).send('Missing parameters or invalid type!');
  }

  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).send('User not found!');
    }

    let eventIndex;
    
    if (type === 0) { // For not dated events
      eventIndex = user.events.findIndex(event => event._id.toString() === _eventId);
      if (eventIndex === -1) {
        return res.status(404).send('Event not found!');
      }
      
      Object.assign(user.events[eventIndex], updatedEvent);
    } else if (type === 1) { // For dated events
      eventIndex = user.dated_events.findIndex(event => event._id.toString() === _eventId);
      if (eventIndex === -1) {
        return res.status(404).send('Dated event not found!');
      }
      
      Object.assign(user.dated_events[eventIndex], updatedEvent);
    }

    await user.save();

    return res.status(200).send('Event updated.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('ERROR!!!');
  }
});


app.post("/deleteEvent", async (req, res) => {
  const { _id, _eventId } = req.body;
  if (!_id || !_eventId) {
    return res.status(400).send('Missing parameters!');
  }
  
  try {
    const user = await UserModel.findById(_id);
    
    if (!user) {
      return res.status(404).send('User not found!');
    }

    const eventIndex = user.events.findIndex(event => event._id.toString() === _eventId);

    if (eventIndex === -1) {
      return res.status(404).send('Event not found!');
    }

    user.events.splice(eventIndex, 1);
    
    await user.save();

    return res.status(200).send('Event deleted.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('ERROR!!!');
  }
});

app.post('/moveEvent', async (req, res) => {
  const { _id, _eventId, date } = req.body;

  try {
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).send('User not found!');
    }

    
    const eventIndex = user.events.findIndex(event => event._id.toString() === _eventId);
    if (eventIndex === -1) {
      return res.status(404).send('Event not found!');
    }

    
    const eventToMove = user.events[eventIndex];
    const datedEvent = {
      ...eventToMove,
      date: [new Date(date)]
    };

    
    user.events.splice(eventIndex, 1); // Remove the event
    user.dated_events.push(datedEvent); // Add to dated_events

    
    await user.save();

    return res.status(200).send('Event moved.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('ERROR!!!');
  }
});

app.post('/copyEvent', async (req, res) => {
  const { _id, _eventID } = req.body;

  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).send('User not found!');
    }

    const event = user.events.id(_eventID);

    if (!event) {
      return res.status(404).send('Event not found!');
    }
    
    //copy of an event
    const eventCopy = {
      name: event.name,
      desc: event.desc,
      color: event.color
    };

    user.events.push(eventCopy);

    await user.save();

    return res.status(200).send('Event copied.');
  } catch (error) {
    console.error('Error copying event:', error);
    return res.status(500).send('ERROR!!!');
  }
});
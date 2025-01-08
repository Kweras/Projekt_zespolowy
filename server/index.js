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
  console.log("Server is running with nodemon on port 3001.");
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

app.put('/changeNick', async (req, res) => {
  try {
    const { _id, password, newNick } = req.body;
    console.log(req.body)
    const e = await UserModel.findOne({ _id });
    if (e != null) {
      const isMatch = await bcrypt.compare(password, e.password);
      if (isMatch) {
        e.nick = newNick;
      } else {
        throw new Error("Password incorrect");
      }
      await e.save();
      res.status(200).send('Nick changed');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error: ' + console.error(error));
    throw new Error("Login or password incorrect")

  }
});
//linia 45, sttingspage.jsx const response = await fetch('http://localhost:3001/changeNick',
app.put('/changePassword', async (req, res) => {
  try {
    const { _id, oldPassword, newPassword } = req.body;
    console.log(req.body)

    const e = await UserModel.findOne({ _id });
    if (e != null) {
      const isMatch = await bcrypt.compare(oldPassword, e.password);

      if (isMatch) {
        e.password = await bcrypt.hash(newPassword, 10);
      }
      await e.save();
      res.status(200).send('Password changed');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error: ' + console.error(error));
    throw new Error("Login or password incorrect")

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
    res.status(200).json({ _id: user._id, nick: user.nick });
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).send('Error logging in');
  }
});


app.get("/getEvents", async (req, res) => {
  const { _id, type } = req.query;

  if (!_id || (type != 0 && type != 1)) {
    return res.status(400).send('Missing parameters or invalid type!');
  }

  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).send('User not found!');
    }
    if (type == 0) {
      return res.status(200).json({
        events: user.events
      });
    }
    else {
      return res.status(200).json({
        dated_events: user.dated_events
      });
    }

  } catch (error) {
    console.error("Error occurred while retrieving events:", error);
    return res.status(500).send('ERROR!!!');
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

    const newEvent = updatedUser.events[updatedUser.events.length - 1];

    return res.status(200).json(newEvent);

  } catch (error) {
    console.error("Error occurred while creating an event:", error);
    return res.status(500).send('Error');
  }
});



app.post("/updateEvent", async (req, res) => {
  const { _id, _eventId, updatedEvent, type } = req.body;

  if (!_id || !_eventId || !updatedEvent || (type != 0 && type != 1)) {
    return res.status(400).send('Missing parameters or invalid type!');
  }

  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).send('User not found!');
    }

    let eventIndex;

    if (type === 0) { // for not dated events
      eventIndex = user.events.findIndex(event => event._id.toString() === _eventId);
      if (eventIndex === -1) {
        return res.status(404).send('Event not found!');
      }

      Object.assign(user.events[eventIndex], updatedEvent);
    } else { // for dated events
      eventIndex = user.dated_events.findIndex(event => event._id.toString() === _eventId);
      if (eventIndex === -1) {
        return res.status(404).send('Dated event not found!');
      }

      Object.assign(user.dated_events[eventIndex], updatedEvent);
    }

    await user.save();

    return res.status(200).send('Event updated.');
  } catch (error) {
    console.error("Error occurred while updating events:", error);
    return res.status(500).send('ERROR!!!');
  }
});


app.post("/deleteEvent", async (req, res) => {
  const { _id, _eventId, type } = req.body;

  if (!_id || !_eventId || (type != 0 && type != 1)) {
    return res.status(400).send('Missing parameters or invalid type!');
  }

  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).send('User not found!');
    }

    let eventIndex;
    if (type === 0) {
      // remove from events
      eventIndex = user.events.findIndex(event => event._id.toString() === _eventId);
      if (eventIndex === -1) {
        return res.status(404).send('Event not found in events!');
      }
      user.events.splice(eventIndex, 1);
    } else {
      // remove from dated-events
      eventIndex = user.dated_events.findIndex(event => event._id.toString() === _eventId);
      if (eventIndex === -1) {
        return res.status(404).send('Event not found in dated events!');
      }
      user.dated_events.splice(eventIndex, 1);
    }

    await user.save();

    return res.status(200).send('Event deleted.');
  } catch (error) {
    console.error("Error occurred while deleting an event:", error);
    return res.status(500).send('ERROR!!!');
  }
});


app.post('/copyEvent', async (req, res) => {
  const { _id, _eventId } = req.body;

  if (!_id || !_eventId) {
    return res.status(400).send('Missing parameters!');
  }

  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).send('User not found!');
    }

    const event = user.events.id(_eventId);

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
    console.error("Error occurred while coping an event:", error);
    return res.status(500).send('ERROR!!!');
  }
});


app.post('/moveEvent', async (req, res) => {
  const { _id, _eventId, date, duration } = req.body;

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


    if (duration === undefined || duration <= 0) {
      return res.status(400).send('Invalid duration!');
    }

    const datedEvent = {
      name: eventToMove.name,
      desc: eventToMove.desc,
      color: eventToMove.color,
      dates: [{
        start: new Date(date),
        duration: duration
      }]
    };

    user.events.splice(eventIndex, 1);
    user.dated_events.push(datedEvent);

    await user.save();

    return res.status(200).send('Event moved.');
  } catch (error) {
    console.error("Error occurred while moving an event:", error);
    return res.status(500).send('ERROR!!!');
  }
});


app.post("/addDate", async (req, res) => {
  const { _id, _eventId, start, duration } = req.body;

  if (!_id || !_eventId || !start || !duration) {
    return res.status(400).send('Missing parameters!');
  }

  try {
    const parsedStart = new Date(start);
    const parsedDuration = Number(duration);

    if (parsedDuration <= 0) {
      return res.status(400).send('Invalid duration value!');
    }

    const newDateEntry = {
      start: parsedStart,
      duration: parsedDuration
    };

    const updatedUser = await UserModel.findOneAndUpdate(
      {
        _id: _id,
        'dated_events._id': _eventId
      },
      {
        $addToSet: { 'dated_events.$.dates': newDateEntry }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User or event not found!');
    }

    res.status(200).send('Date added successfully.');
  } catch (error) {
    console.error("Error occurred while adding a date to a dated_event:", error);
    res.status(500).send('ERROR!!!');
  }
});


app.post('/removeDate', async (req, res) => {
  const { _id, _eventId, _dateId } = req.body;

  if (!_id || !_eventId || !_dateId) {
    return res.status(400).send('Missing parameters!');
  }

  try {
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).send('User not found!');
    }

    const datedEvent = user.dated_events.id(_eventId);
    if (!datedEvent) {
      return res.status(404).send('Event not found!');
    }

    const dateIndex = datedEvent.dates.findIndex(date => date._id.toString() === _dateId);
    if (dateIndex !== -1) {
      datedEvent.dates.splice(dateIndex, 1);
      await user.save();

      if (datedEvent.dates.length === 0) {
        const eventIndex = user.dated_events.findIndex(event => event._id.toString() === _eventId);
        user.dated_events.splice(eventIndex, 1);
        await user.save();
        return res.status(200).send('Event removed (no dates left).');
      }

      return res.status(200).send('Date removed');
    } else {
      return res.status(404).send('Date not found!');
    }
  } catch (error) {
    console.error("Error occurred while removing a date from dated_event:", error);
    res.status(500).send('ERROR!!!');
  }
});


app.get('/getEventsByDate', async (req, res) => {
  const { _id, from, to } = req.query;

  if (!_id || !from || !to) {
    return res.status(400).send('Missing parameters!');
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (fromDate > toDate) {
    return res.status(400).send('Invalid dates');
  }

  try {
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).send('User not found!');
    }

    const eventsInRange = user.dated_events
      .map(event => {
        const filteredDates = event.dates.filter(eventDate => {
          return eventDate.start >= fromDate && eventDate.start <= toDate;
        });

        if (filteredDates.length > 0) {
          return {
            _id: event._id,
            name: event.name,
            desc: event.desc,
            color: event.color,
            dates: filteredDates
          };
        }
      })
      .filter(event => event !== undefined);

    return res.status(200).json(eventsInRange);
  } catch (error) {
    console.error("Error occurred while retrieving events:", error);
    return res.status(500).send('ERROR!!!');
  }
});

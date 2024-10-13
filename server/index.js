const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UserModel } = require("./models/user");


const cors = require('cors');
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://kweras:9p1Mp3aBvxjqcn1M@cluster0.bbcer.mongodb.net/master_planer");
//My local database name is: master_planer



app.listen(3001, () => {
  console.log("server is running with nodemon");
});

app.get("/getUsers", async (req, res) => {
  UserModel.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// app.post("/createUser", async (req, res) => {
//   const obj = req.body;
//   const newUser = new UserModel(obj);
//   await newUser.save();
//   res.json(obj);
// });

//Rejestracja

app.post('/register', async (req, res) => {
  try {
    const { nick, email, password } = req.body;
    const e = await UserModel.findOne({ email });
    if (e != null) {
      if (e.email == email) {
        throw new Error("Uzytkownik o podanym email juz istnieje!")
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ nick, email, password: hashedPassword });
    await user.save();
    console.log(req.body)
    res.status(201).send('Stworzono uzytkownika!');
  } catch (error) {
    res.status(500).send('Błąd: ' + console.error(error));
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

    console.log(user)
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
      return res.status(404).json({ message: "User not found." });
    }
    res.json(updatedUser.events);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding event.", error });
  }
});
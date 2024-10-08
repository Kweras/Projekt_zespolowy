const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { UserModel} = require("./models/user");


const cors = require('cors');
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/master_planer");
//My local database name is: master_planer



app.listen(3001, () =>{
  console.log("server is running with nodemon");
});

app.get("/getUsers", async (req, res) =>{
  UserModel.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

app.post("/createUser", async (req, res) => {
  const obj = req.body;
  const newUser = new UserModel(obj);
  await newUser.save();
  res.json(obj);
});

app.post("/createEvent", async (req, res) => {
  const {_id, event} = req.body;
  try{
    const updatedUser = await UserModel.findByIdAndUpdate(
    _id,
    {$push: { events: event }},
    {new: true, useFindAndModify: false}
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
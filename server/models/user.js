const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  desc: { 
    type: String,
    default: ""
  },
  color: { 
    type: String, 
    required: true,
    default: "Blue"
  }
});

const datedEventSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  desc: { 
    type: String,
    default: "" 
  },
  color: { 
    type: String,
    required: true,
    default: "Blue" 
  },
  start: {
    type: Date,
    required: true
  },
  duration: { //in minutes
    type: Number,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  nick: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  events: {
    type: [eventSchema],
    default: Array
  },
  dated_events: {
    type: [datedEventSchema],
    default: Array
  }
}, {
  versionKey: false // Disables the __v field
});

const UserModel = mongoose.model("users", userSchema);
//  collection name in mongoDB    ^^^
module.exports = { UserModel };
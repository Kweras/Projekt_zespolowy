const express = require("express");
const app = express();
const mongoose = require('mongoose');


const cors = require('cors');
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/master_planer");
//My local database name is: master_planer



app.listen(3001, () =>{
  console.log("Server is running with nodemon");
});
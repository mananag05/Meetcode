const mongoose = require("mongoose");
const { v4: uniqueid } = require('uuid');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: {
      type: String,
      unique: true,
      index: true,
      required: true,
      default : uniqueid
    } 
  })

  const USER = mongoose.model('Users',userSchema);
  
  module.exports = USER;
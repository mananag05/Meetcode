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

const roleschema = new mongoose.Schema({
    userid : String,
    roles: {
      type: [String], // specifying that roles should be an array of strings
      default: []     // we can set a default value if needed
  }
})
  
  
  const ROLES = mongoose.model('Roles',roleschema);
  const USER = mongoose.model('Users',userSchema);
  
  module.exports = USER;
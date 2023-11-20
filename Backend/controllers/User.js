const USER = require("../models/users");
const JWT_SECRET = "secret";
var jwt = require('jsonwebtoken');

async function signup (req,res){
    const curremail = req.body.email;
    const password = req.body.password;
  
    try {
      // Check if the email already exists
      const existingUser = await USER.findOne({ email:curremail });
  
      if (existingUser) {
        return res.status(403).json({ msg: 'Email already exists' });
      }
  
      // Create a new user
      const newUser = new USER({ email : curremail, password : password });
      await newUser.save();
  
      return res.json({ msg: 'Success' });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

async function login (req,res){
    const curremail = req.body.email;
    const password = req.body.password;
    const user = await USER.findOne({ email:curremail });
  
    if (!user) {
      return res.status(403).json({ msg: "User not found" });
    }
  
    if (user.password !== password) {
      return res.status(403).json({ msg: "Incorrect password" });
    }
  
    const token = jwt.sign(
      {
        id: user.userId,
      },
      JWT_SECRET
    );
    return res.json({ token });
}

module.exports = {
    signup,
    login,
}
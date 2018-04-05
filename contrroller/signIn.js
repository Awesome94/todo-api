const User = require("../models/userSchema");
const UserSession = require("../models/userSession");

const bcrypt = require('bcrypt')

const handleSignin = (req, res)=>{
const { password} = req.body;
let { email } = req.body;
if(!email){
  res.json("username cannot be blank")
}
if(!password){
  res.json("password is blank")
}
email = email.toLowerCase();

User.find({
  email: email,
},(err, users) => {
  if (err) {
    return res.json("Error: Server Error")
}
if (users.length != 1) {
  return res.json("Error invalid")
}
const user = users[0];
if(!user.validPassword(password)){
  return res.json("Error Invalid")
}
const userSession = new UserSession();
userSession.userId  = user.id;
userSession.save((err, doc) =>{
  if(err){
    res.json("Error server error")
  }
  return res.json({
    Mesage: "Valid Signin",
    token: doc._id
  });
})
})
}
module.exports = {
  handleSignin: handleSignin
};
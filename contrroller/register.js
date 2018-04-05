const User = require("../models/userSchema")
const bcrypt = require('bcrypt')

const registerHandler = (req, res) => {
  const { firstName, lastName, password } = req.body;
  let { email } = req.body
  if (!firstName){
    return res.json({
      success: false,
      message: 'Error First Name cannot be blank'
    });
  }
  if(!email){
    return res.json({
      success: false,
      message: 'Error email cannot be blank'
    });
  }
  if(!password){
    return res.send({
      success: false,
      message: 'Error password cannot be blank'
    });
  }
email = email.toLowerCase();

User.find({
  email: email
}, (err, previousUsers)=>{
  if(err){
    return res.send('Error: server error');
  }else if (previousUsers.length > 0) {
    return  res.send({
      success: false,
      message:'Error account already exists'
    });
  }

  const newUser = new User();

  newUser.email = email;
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.password = newUser.generateHash(password);

  newUser.save((err, user) => {
    if(err) {
      console.log(err)
     return res.send({
        success: false,
        message: 'Error Server Error'
      });
    }
    return res.json("signed up")
    });
  })
}
module.exports = {
  registerHandler: registerHandler
};
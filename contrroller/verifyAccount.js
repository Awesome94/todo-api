const User = require("../models/userSchema");
const UserSession = require("../models/userSession");

/*Get the token and verify that the token is one of  a kind.*/

const handleVerify = (req, res, next) => {
  const {token} = req.query;

  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions)=>{
    if(err){
      return res.status(400).json("Server Error: Invalid Token");
      }
    return res.status(200).json("success")
  })
};

module.exports = {
  handleVerify: handleVerify
}
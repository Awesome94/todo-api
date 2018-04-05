const User = require("../models/userSchema");
const UserSession = require("../models/userSession");

const handleLogout = (req, res, next) => {
  const {token} = req.query;

  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set:{isDeleted:true}
  }, null, (err, sessions) => {
    if (err) {
      return res.json("Error Server Error");
    }
    return res.json("Token success")
  })
}
module.exports = {
  handleLogout: handleLogout
};
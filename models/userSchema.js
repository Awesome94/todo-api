const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String, required: true, default:'' },
  lastName: {
    type:String, default:''},
  email: {
    type: String, required: true, unique:true, default:''},
  password: {
    type: String, required: true, default:''},
  isDeleted: {
    type: Boolean, default:false
  }
  });

  UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = mongoose.model('User', UserSchema);

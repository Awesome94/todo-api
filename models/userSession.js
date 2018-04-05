const mongoose = require('mongoose');

const schema = mongoose.schema

const UserSessionSchema = new Schema({
  UserId: {
    type: Number,
    default: -1
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('UserSession', UserSessionSchema)
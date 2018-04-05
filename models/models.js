const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
username: {type: String, required: true, index: { unique: true} },
password: {type: String, required: true, }
});

const TodoItemsSchema = new Schema({
  text: String,
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  },
  status: { type: Boolean, default: false }
});

const TodoListSchema = new Schema({
  text: String,
  CreatedAt: {
    type: Date,
    default: Date.now()
  },
  UpdatedAt: {
    type: Date,
    default: Date.now()
  },
  items: [TodoItemsSchema]
});

var TodoList = mongoose.model("TodoList", TodoListSchema)

var Login = mongoose.model("Login", LoginSchema)

module.exports.TodoList = TodoList;
module.exports.Login = Login;

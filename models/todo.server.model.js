const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

});

const Login = new Schema({

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

modules.exports.TodoList = TodoList;

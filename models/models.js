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

var User = mongoose.model("User", UserSchema)

UserSchema.methods.generateHash = function(pasword) {
  return bcrypt.hashSync(password, bcrypt.genSaltsnyc(8), null);
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports.TodoList = TodoList;
module.exports.Login = Login;
module.exports.User = User;

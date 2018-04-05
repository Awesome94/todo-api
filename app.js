const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const logger = require("morgan");
const mongoose = require("mongoose");
const TodoList = require("./models/models").TodoList;
const Login = require("./models/models").Login;
const register = require("./contrroller/register");
const signIn = require("./contrroller/signIn");
const logout = require("./contrroller/logout");
const verify = require("./contrroller/verifyAccount");


const passport = require('passport');
var expressSession = require("express-session");

const app = express();

mongoose.connect("mongodb://localhost:27017/todolist")

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("connection error: err");
});

db.once("open", () => {
  console.log("db connection successful")
})

app.use(expressSession({
  secret: 'yes',
  name: '',
  store: '', // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) { //allow access control headers
  res.header("Allow-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('api/v1', (req, res) => {
  return res.send("api is in action")
})
app.post('api/v1/signin', signIn.handleSignin)

app.post('api/v1/register', register.registerHandler);

app.get('/api/v1/verify', verify.handleVerify);
app.get('/api/v1/logout', logout.handleLogout);

app.get('/v1/profile/:id');
app.post('/v1/todo');
app.get('/v1/todo/:id');
app.put('/v1/todo/:id');
app.delete('/v1/todo');
app.delete('/v1/todo/:id');

app.use((err, req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})

const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const logger = require("morgan");
const mongoose = require("mongoose");
const TodoList = require("./models/models").TodoList;
const Login = require("./models/models").Login;
const User = require("./models/userSchema")
const bcrypt = require('bcrypt')


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

const login = 'Login'

app.get('/v1', (req, res) => {
  return res.send("api is in action")
})
app.post('/v1/signin', (req, res) => {
  return (res.send("you are trying to access v1/signin"))
  passport.use('login', new localStrategy({
    passReqToCallback: true
  },
    (req, username, password, done) => {
      User.findOne({ 'username': username },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            console.log(`User with ${username} Not found`);
            return done(null, false,
              req.flash('message', 'invalid password'));
          }
          return done(null, user);
        }
      )
    }

  ))
})

app.post('/v1/register', (req, res) => {
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
  email
}, (err, previousUsers)=>{
  if(err){
    return res.send('Error: server error');
  }else if (previousUsers.lenght > 0) {
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
});

app.get('/v1/profile/:id')
app.post('/v1/todo')
app.get('/v1/todo/:id')
app.put('/v1/todo/:id')
app.delete('/v1/todo')
app.delete('/v1/todo/:id')

// app.use((err, req, res, next) => {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({
//     error: {
//       message: err.message
//     }
//   });
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})

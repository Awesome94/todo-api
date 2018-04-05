const express  = require('express');
const path = require("path");
const bodyParser  = require('body-parser');
const logger = require("morgan");
const mongoose = require ("mongoose");

const app = express()

mongoose.connect("mongodb://localhost:27017/todolist")

app.use(function (req, res, next) {
  res.header("Allow-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/v1', (req, res) => {
return res.send("api is in action")
})
app.post('/v1/signin', (req, res) => {
return(res.send("you are trying to access v1/signin"))
})
app.post('/v1/register')
app.get('/v1/profile/:id')
app.post('/v1/todo')
app.get('/v1/todo/:id')
app.put('/v1/todo/:id')
app.delete('/v1/todo')
app.delete('/v1/todo/:id')

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

app.listen(PORT, ()=>{
 console.log(`app is listening on port ${PORT}`)
})
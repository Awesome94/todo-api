import express from 'express';
import path from "path";
import bodyParser from 'body-parser';
import logger from "morgan";
import mongoose from "mongoose";
import bb from "express-busboy";

const app = express

app.use(function (req, res, next) {
  res.header("Allow-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

PORT = process.env.PORT

app.listen(process.env.PORT || 3000, ()=>{
 console.log(`app is listening on port ${PORT}`)
})
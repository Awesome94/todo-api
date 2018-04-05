import express from 'express';
import path from "path";
import bodyParser from 'body-parser';
import logger from "morgan";
import mongoose from "mongoose";
import bb from "express-busboy";

const app = express

PORT = process.env.PORT

app.listen(process.env.PORT || 3000, ()=>{
 console.log(`app is listening on port ${PORT}`)
})
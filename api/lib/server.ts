
import router from './config/routes'
import {createConnection} from 'typeorm'// lib/app.ts
// import  express from "express";
import * as bodyParser from "body-parser";
const passport = require('passport')
const express = require('express')
const PORT = process.env.PORT || 3000;


  
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

createConnection().then( async connection => {
    console.log("connected " )
}).catch(error => console.log(error));

app.use(passport.initialize());
app.use(passport.session());
app.use(router);
// console.log(passport)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

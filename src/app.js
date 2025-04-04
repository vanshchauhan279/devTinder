const express = require("express");
const connectDb= require("./config/database")
const cookieParser = require('cookie-parser')   
const User= require('./models/user');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request")

const app = express();
const port = 7777

app.use(express.json()) //enable json parsing, without this req.body gives undefined
app.use(cookieParser())

app.use('/',authRouter, profileRouter, requestRouter)

connectDb()
    .then(()=>{
        console.log("Database connection established");
        app.listen(port,()=>{
            console.log(`app listening on port ${port}`)
        })
    })
    .catch(()=>{
        console.log("database is not connected")
    })




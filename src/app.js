const express = require("express");
const connectDb=require("./config/database")
const app = express();
const port = 7777


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




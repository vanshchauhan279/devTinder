const express = require("express");
const connectDb=require("./config/database")
const User= require('./models/user')
const app = express();
const port = 7777

app.use(express.json())

app.post('/signup', async(req,res)=>{

    try{
        const user=await User.create(req.body)
       
          res.send("user is added in the system")
    }
    catch(err){
        res.status(500).send("Something went wrong")
    }
})

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




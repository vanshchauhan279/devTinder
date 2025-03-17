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

app.get('/feed',async(req,res)=>{
     try{
        const users= await User.find({})
        res.json(users)
     }
     catch(err){
        res.status(404).send("something went wrong");
     }
})

app.get('/user',async (req,res)=>{
    try{
         const emailId =await req.body.email
         const user = await User.find({email: emailId})
         res.json(user)
    }
    catch(err){
        res.send("Something Went wrong")
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




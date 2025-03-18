const express = require("express");
const connectDb=require("./config/database")
const User= require('./models/user')
const app = express();
const port = 7777

app.use(express.json()) //enable json parsing, without this req.body gives undefined

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

app.delete('/user',async(req,res)=>{
    try{
        const userId = await req.body.userId
        await User.findByIdAndDelete(userId)
        res.send("User is successfully deleted")
    }
    catch(err){
         res.status(404).send("something went wrong")
    }
})

//delete the documents that matches the condition
app.delete('/user/byEmail',async (req,res)=>{
     try{
         
        const email = await req.body.email
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const result=await User.deleteOne({email: email})
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
         res.send("User deleted successfully by email")

     }
     catch(err){
        res.status(404).send("something went wrong")
   }
})

app.patch('/user', async(req,res)=>{
    try{
        const userId = await req.body.userId;
        const updateData = await req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        await User.findByIdAndUpdate(userId,updateData) 
        res.send("user is updated ")
    }
    catch(err){
        res.status(404).send("something went wrong")
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




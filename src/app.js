const express = require("express");
const connectDb= require("./config/database")
const Validation = require("./utils/Validation")
const cookieParser = require('cookie-parser')   
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User= require('./models/user')
const app = express();
const port = 7777

app.use(express.json()) //enable json parsing, without this req.body gives undefined
app.use(cookieParser())

app.post('/signup', async(req,res)=>{
    try{
          Validation(req);

          const {firstName,lastName,email,password}= req.body;

          const passwordHash=await bcrypt.hash(password, 10);

          const user=await User.create({
            firstName,
            lastName,
            email,
            password: passwordHash
          })

          res.send("user is successfully added")
    }
    catch(err){

        if (err.code === 11000) {
            return res.status(400).json({ error: "Email already exists. Please use a different email." });
        }
        res.status(500).send(err.message);
    } 
})

app.post("/login", async(req,res)=>{
    try{
         const {email, password} = req.body;

         const user = await User.findOne({email: email})
         if(!user){
            throw new Error("Invalid Credentials")
         }
         
         const validPassword =await bcrypt.compare(password, user.password);

         if(validPassword){   
            var token = jwt.sign({ _id: '67de52253f76b02053bb1c3e' }, 'VanshChauhan975922');
            res.cookie("token",token)
            res.send("Login Successfully")
         }
         else{
            throw new Error("Invalid Credentials")
         }

    }
    catch(err){
        res.status(404).send(err.message)
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

app.patch('/user/:userId', async(req,res)=>{
   
    try{
        const userId = await req.params.userId;
        const updateData = await req.body;

        const updateAllowed = ["gender","password","skills"];
        
        const isUpdateAllowed = Object.keys(updateData).every((k)=>{
            return(updateAllowed.includes(k))
              
        })

        if(!isUpdateAllowed){
            throw new Error("Update not allowed")
        }

        if(updateData.skills.length > 4){
            throw new Error("skills should be more than 4")
        }


        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        await User.findByIdAndUpdate(userId,updateData,{runValidators: true}) 
        res.send("user is updated ")
    }
    catch(err){
        res.status(404).send(err.message)
   }
})

app.get('/profile',async(req,res)=>{
    try{
          const cookie = req.cookies; 
          const {token}= cookie;
          console.log(token);
         
          const decoded= jwt.verify(token, 'VanshChauhan975922');
          const {_id}= decoded
          console.log(_id)

          const user = await User.findById(_id).exec();

          console.log(user);

          res.send("coookies passed succesfully")
    }
    catch(err){
        res.status(404).send(err.message)
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




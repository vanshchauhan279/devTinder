const express = require("express");
const profileRouter = express.Router()
const User= require('../models/user');


profileRouter.get('/feed',async(req,res)=>{
    try{
       const users= await User.find({})
       res.json(users)
    }
    catch(err){
       res.status(404).send("something went wrong");
    }
})

profileRouter.get('/user',async (req,res)=>{
    try{
         const emailId =await req.body.email
         const user = await User.find({email: emailId})
         res.json(user)
    }
    catch(err){
        res.send("Something Went wrong")
    }
})

profileRouter.delete('/user',async(req,res)=>{
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
profileRouter.delete('/user/byEmail',async (req,res)=>{
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

profileRouter.patch('/user/:userId', async(req,res)=>{
   
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

module.exports = profileRouter;
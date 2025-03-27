const express = require("express");
const profileRouter = express.Router()
const User= require('../models/user');
const { profileAuth } = require("../middleWare/Auth");
const validator = require("validator")
const bcrypt = require("bcrypt")


profileRouter.get('/profile/view',profileAuth,async(req,res)=>{
    try{
         const user = req.user;
          res.send(user)
    }
    catch(err){
        res.status(404).send(err.message)
    }
})

profileRouter.patch("/profile/edit",profileAuth,async(req,res)=>{
    try{
          const updateUser = req.user;
          const updateData = req.body;

          const updateAllowed = ["gender","skills"];
          const isUpdateAllowed = Object.keys(updateData).every((key)=>{
                  return (updateAllowed.includes(key));
          })

          if(!isUpdateAllowed){
            throw new Error("Update is not allowed for this key")
          }
          await User.findOneAndUpdate(updateUser,updateData,{runValidators: true}) 
          res.send("user is updated ")

    }
    catch(err){
        res.status(404).send(err.message)
    }
})


profileRouter.get('/feed',profileAuth,async(req,res)=>{
    try{
       const users= await User.find({})
       res.json(users)
    }
    catch(err){
       res.status(404).send("something went wrong");
    }
})

profileRouter.patch("/profile/forgotPassword",async(req,res)=>{
    try{
            const {email, newPassword} = req.body;
            
            const user = await User.findOne({email: email})
            if (!user) {
                throw new Error("User not found");
            }
            user.password = await bcrypt.hash(newPassword, 10);
           
            await user.save();
            res.send("Password updated successfully");
     }
     catch(err){
        res.status(404).send(err.message);
     }
})


module.exports = profileRouter;
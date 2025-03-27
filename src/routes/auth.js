const express = require("express");
const authRouter = express.Router();
const Validation = require("../utils/Validation")
const bcrypt = require('bcrypt');
const User= require('../models/user');
const getJWT = require('../models/user')
const validatedPassword = require("../models/user")

authRouter.post('/signup', async(req,res)=>{
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

authRouter.post("/login", async(req,res)=>{
    try{
        const {email, password} = req.body;

         const user = await User.findOne({email: email})
         if(!user){
            throw new Error("Invalid Credentials")
         }
         
         const validPassword =await user.validatedPassword(password)
         

         if(validPassword){   
            const token =await user.getJWT()
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

authRouter.post('/logout',async (req,res)=>{
     res.clearCookie("token",null,{
        expires: new Date(Date.now())
     });
     res.send("User logged out successfully")
})

module.exports = authRouter;

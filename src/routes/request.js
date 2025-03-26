const express = require("express");
const requestRouter = express.Router();
const { profileAuth } = require("../middleWare/Auth");
const User= require('../models/user');

requestRouter.get('/profile',profileAuth,async(req,res)=>{
    try{
         console.log(req.user) 
          res.send("coookies passed succesfully")
    }
    catch(err){
        res.status(404).send(err.message)
    }
})

requestRouter.post('/sendConnectionRequest',profileAuth,async(req,res)=>{
    try{
         res.send(req.user + "send the connection request")
   }
   catch(err){
       res.status(404).send(err.message)
   }
})

module.exports = requestRouter;

const express = require("express");
const requestRouter = express.Router();
const { profileAuth } = require("../middleWare/Auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


requestRouter.post('/request/send/:status/:toUserId',profileAuth, async(req,res)=>{
    try{
          const toUserId = req.params.toUserId;
          const fromUserId = req.user._id;
          const status = req.params.status;

          const allowedStatus = ["interested","ignored"];
          if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid status type");
          }

          const toUser = await User.findById(toUserId); 
          if(!toUser){
               return res.status(400).send("User does not exist in the User database")
          }

          const existingConnectionRequest =await connectionRequest.findOne({
            $or: [
                {fromUserId,toUserId},
                {
                 fromUserId: toUserId,
                 toUserId: fromUserId
                }
            ]
          }) 
          if(existingConnectionRequest){
            return res.status(400).send("Connection request already send")
          }

          const connection = await connectionRequest.create({
             toUserId,
             fromUserId,
             status
          })

          res.json({
            message: req.user.firstName + " send request to " + toUser.firstName ,
            connection,
          }) 
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

requestRouter.post('/request/review/:status/:requestId', profileAuth, async(req,res)=>{
    try{
         const loggedInUser = req.user;
         const {status,requestId} =  req.params;

         const allowedStatus = ["accepted","rejected"];
         if(!allowedStatus.includes(status)){
            return res.status(400).send("status is not allowed");
         }
 
         const request = await connectionRequest.findOne({
             _id: requestId,
             toUserId: loggedInUser._id,
             status: "interested"
         })
         if(!request){
            return res.status(400).send("No connection Request found");
         }
          
         request.status = status;

        const data =await request.save();

         res.send({
            message: "Connection Request "+ status , data
         })

    }
    catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = requestRouter;

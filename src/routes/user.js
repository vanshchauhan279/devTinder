const express = require("express");
const userRouter = express.Router();
const { profileAuth } = require("../middleWare/Auth");
const connectionRequest = require("../models/connectionRequest");

userRouter.get('/user/request/receive', profileAuth, async(req,res)=>{
    try{
         const loggedInUser = req.user;

         const request= await connectionRequest.find({
            toUserId : loggedInUser._id,
            status: "interested"
         }).populate('fromUserId','firstName lastName skills')
        
         if(request.length===0){
            return res.json({message: "No Connection Request received"})
         }

         res.send(request);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

userRouter.get('/user/connections', profileAuth, async(req,res)=>{
    try{
         const loggedInUser = req.user;

         const request = await connectionRequest.find({
            $or: [
                 {toUserId: loggedInUser, status: "accepted"},
                 {fromUserId: loggedInUser, status: "accepted"}
            ]
         })
         .populate("fromUserId","firstName lastName skills")
         .populate("toUserId","firstName lastName skills")
         
         const data = request.map((row)=>{
              if(row.fromUserId.toString()===loggedInUser._id.toString()){
                return row.toUserId;
              }
              return row.fromUserId;
         })
         res.json({data});

    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports = userRouter;
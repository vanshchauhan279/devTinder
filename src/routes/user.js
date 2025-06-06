const express = require("express");
const userRouter = express.Router();
const { profileAuth } = require("../middleWare/Auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

userRouter.get('/user/request/receive', profileAuth, async(req,res)=>{
    try{
         const loggedInUser = req.user;

         const request= await connectionRequest.find({
            toUserId : loggedInUser._id,
            status: "interested"
         }).populate('fromUserId','firstName lastName skills photoUrl')
        
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
         .populate("fromUserId","firstName lastName skills photoUrl")
         .populate("toUserId","firstName lastName skills photoUrl")
         
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

userRouter.get('/feed',profileAuth, async(req,res)=>{
    try{
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 100;
         const skip = (page-1)*limit;

         const loggedInUser = req.user;
         const avoidConnections = await connectionRequest.find({
           $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }) 
        

        const avoidId = new Set();
        avoidConnections.forEach(req=>{
            avoidId.add(req.fromUserId.toString());
            avoidId.add(req.toUserId.toString())
        })
        avoidId.add(loggedInUser._id.toString());

        const feedUsers = await User.find({
            _id: {$nin: Array.from(avoidId)}
        })
        .select("firstName lastName photoUrl skills gender")
        .skip(skip)
        .limit(limit)
 
        res.send(feedUsers);
    } 
    catch(err){ 
        res.status(400).send(err);
    }
})

module.exports = userRouter; 
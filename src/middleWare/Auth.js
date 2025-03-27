const jwt = require('jsonwebtoken');
const User= require('../models/user');

const profileAuth= async (req,res,next)=>{
     try{
             const cookie = req.cookies; 
             const {token}= cookie;
             if(!token){
                throw new Error("Please Login ")
             }    
             const decoded= jwt.verify(token, 'VanshChauhan975922');
             const {_id}= decoded

             const user = await User.findById(_id).exec();
             if(!user){
                throw new Error("user not found")
             }
             req.user= user;
             next()
     }
     catch(err){
        res.status(404).send(err.message);
     }
}

module.exports={
     profileAuth
};
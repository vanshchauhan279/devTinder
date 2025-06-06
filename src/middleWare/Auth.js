const jwt = require('jsonwebtoken');
const User= require('../models/user');

const profileAuth= async (req,res,next)=>{
     try{
             const cookie = req.cookies; 
             const {token}= cookie;
             if(!token){
               return res.status(401).send("Please Login")
             }     
             const decoded= jwt.verify(token, 'VanshChauhan975922');
             const {_id}= decoded

             const user = await User.findById(_id).exec();    
             if(!user){
                return res.status(401).send("no user")
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
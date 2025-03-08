const express = require("express");
const app = express();
const port = 7777

app.get('/user',(req,res,next)=>{
     console.log("1 Router")
     next()
    //  res.send("This is 1 Response")
},
(req,res,next)=>{
   console.log("2 Route")
   next()
//    res.send("This is a second Response")
 

},(req,res,next)=>{
    console.log("3 Route")
    res.send("This is a 3 Response")
 
 })

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})



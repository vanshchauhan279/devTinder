const express = require("express");
const app = express();
const port = 7777

app.use('/',function(req,res){
    try{
        console.log("try run when we use USE method")
        throw new error()
        res.send("data send")
    }
    catch(err){
        res.status(400).send("Something went wrong")
    } 
})


app.use('/',(err,req,res,next)=>{
    if(err){
        res.status(400).send("error occured here")
    }
})

app.get('/user',function(req,res){
    res.send("user content")
})



app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})



const express = require("express");
const {adminAuth,userAuth}=require('./middleWare/Auth')

const app = express();
const port = 7777

app.use('/admin',adminAuth)

app.get('/user',userAuth,function(req,res){
     res.send("user data send")
})

app.get('/admin/getAllData',(req,res)=>{
        res.send("All Data Sent");    
})

app.get('/admin/deleteUser',(req,res)=>{
        res.send("Delete User Account");  
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})



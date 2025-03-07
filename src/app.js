const express = require("express");
const app = express();
const port = 7777

app.use('/hello',(req,res)=>{
    res.send("Hello Hello Hello")
})
app.use('/text',(req,res)=>{
     res.send("This is text message")
})
app.use('/',(req,res)=>{
    res.send("message from the server")
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})



const express = require("express");
const app = express();
const port = 7777


// app.use('/',(req,res)=>{
//     res.send("message from the server")
// })

app.use('/hello',(req,res)=>{
    res.send("Hello Hello Hello")
})

app.get('/user',(req,res)=>{
    res.send({firstName: "Vansh", lastName: "Chauhan"})
})

app.post('/user',(req,res)=>{
    res.send("Data Successful saved to database")
})

app.put('/user',(req,res)=>{
    res.send("Data is updated")
})

app.delete('/user',(req,res)=>{
     res.send("Record is deleted from Database")
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})



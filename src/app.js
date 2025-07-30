const express = require("express");
const connectDb= require("./config/database")
const cookieParser = require('cookie-parser')   
const User= require('./models/user');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user")
const cors = require('cors')
const http = require("http");
const initializeSocket = require("./utils/sockets");

const app = express();  
const port = 7777

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json()) 
app.use(cookieParser())

const server = http.createServer(app)
initializeSocket(server)

app.use('/',authRouter, profileRouter, requestRouter,userRouter)

connectDb()
    .then(()=>{
        console.log("Database connection established");
        server.listen(port,()=>{
            console.log(`app listening on port ${port}`)
        })
    })
    .catch(()=>{
        console.log("database is not connected")
    })
 

  

   
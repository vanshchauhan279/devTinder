const express = require("express");
const connectDb= require("./config/database")
const cookieParser = require('cookie-parser')   
const User= require('./models/user');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user")
const cors = require('cors')

const app = express();  
const port = 7777

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json()) 
app.use(cookieParser())

app.use('/',authRouter, profileRouter, requestRouter,userRouter)

connectDb()
    .then(()=>{
        console.log("Database connection established");
        app.listen(port,()=>{
            console.log(`app listening on port ${port}`)
        })
    })
    .catch(()=>{
        console.log("database is not connected")
    })
 

  

   
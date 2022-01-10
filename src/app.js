const express= require('express');
const dotenv = require('dotenv')
const dbConnect= require('./config/dbConnect');
const { registerUser } = require('./controllers/users/userCtrl');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const userRoute = require('./routes/users/usersRoute');

const app=express();

//env 
dotenv.config();

//database connection call from dbConnect config module
dbConnect();

//create a customized middleware that sits btwn reqs and res
const logger = (req, res, next)=>{
    console.log("i am a logger") 
    next();
 }
 
 app.use(logger);

 //middlewares
 app.use(express.json());

//routes
app.use("/api/users", userRoute)

//Error handler middleware
app.use(notFound)
app.use(errorHandler)


module.exports=app;


 
const express= require('express');
const app = require('../../app');
const { registerUser, fetchUsersCtrl } = require('../../controllers/users/userCtrl');

//Router 

const userRoute = express.Router();


//register user route
userRoute.post('/register', registerUser);
userRoute.get('/', fetchUsersCtrl);


module.exports=userRoute;
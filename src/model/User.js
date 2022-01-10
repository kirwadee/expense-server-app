const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');

//schema gives a blueprint of how an object can be created
const userSchema = mongoose.Schema({
    firstname:{
        required:[true, "First name is required"],
        type: String,
    },
    lastname:{
        required:[true, "Last name is required"],
        type:String,
    },
    email:{
        required:[true, "Email is required"],
        type:String,
    },
    password:{
        required:[true, "Password is required"],
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamp:true,})

//Hash password using mongoose pre middleware
//pre function outlines run this function b4 the user is saved
userSchema.pre('save', async function(next){
    //if the password field is updated anytime run hash function to rehash the password
    if(!this.isModified('password')){
      next();
    }
     
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

})

//compile schema into model
const User=mongoose.model('User', userSchema);
module.exports=User;    
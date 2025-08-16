const mongoose = require("mongoose");
const { isEmail } = require("validator");

const {Schema} = mongoose;

const userSchema = new Schema({
    firstname:{
        required:[true, " Please enter your first name "],
        type:String
    },
    lastname:{
        required:[true, " Please enter your last name "],
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:[true,"This email is already exist "],
        lowercase:true,
        validate :[isEmail , "Please enter a valid email"]
    },
    password:{
        require:[true, " Please enter your password "],
        type:String,
        minlength : [6 , "Minimum password length is 6 characters"]
    }
})

const User = mongoose.model("user" , userSchema);

module.exports = User;
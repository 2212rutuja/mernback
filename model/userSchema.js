import mongoose from "mongoose";

const userschemas = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    username:{
        type:String,
        required:true,
        trim:true,
        index:true,
        unique:true,
        lowercase:true
    },
    email:
    {
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    mobileno:{
        type:Number,
        required:true
    }

});

const User = mongoose.model('user',userschemas)

export default User;
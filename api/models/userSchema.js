import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";
import  jwt  from "jsonwebtoken";


const userSchema  = mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter a username"]
    },
    email:{
        type:String,
        require:[true,"Please enter a username"],
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    phone:{
        type:String,
        require:[true,"Please enter a phone number"]
    },
    password:{
        type:String,
        require:[true,"Please enter a password"],
        minLength:[8,"Enter a password longer than or equal to 8 characters"]
    },
    role:{
        type:String,
        require:true,
        enum:["Job Seeker","Employer"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


//Hasing the password
userSchema.pre("save",async function(){
    this.password = await bcrypt.hash(this.password,10)
})

//Compare Passwords
userSchema.methods.comparePasswords = async function (enteredPassword) {
    const match = await bcrypt.compare(enteredPassword,this.password)
    return match
};

//JWT Token
userSchema.methods.getJWTtoken = async function(){
    const token = await jwt.sign({id:this._id},"ABCD")
    return token
};

export const User = mongoose.model("User",userSchema)
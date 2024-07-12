import {User} from "../models/userSchema.js"
import errorHandler from "../error/errorHandler.js"
import asyncWrapper from "express-async-handler"
import {sendJwtToken} from "../utils/sendJwtToken.js"
import ErrorHandler from "../error/errorHandler.js"
import bcrypt from "bcrypt"

const register = asyncWrapper(async (req,res,next)=>{
    const {name,email,phone,role,password} = req.body
    if(!name || !email || !phone || !role || !password){
        return next(new errorHandler("Please fill all fields!"))
    }
    const isEmail = await User.findOne({email})
    if(isEmail){
        return next(new errorHandler("Email already exists!"))
    }

    const user = await User.create({
        name,email,phone,role,password
    })

    sendJwtToken(user,200,res,"User Registered Successfully!")
})

const login = asyncWrapper(async (req,res,next)=>{
    const {email,password,role} = req.body
    if(!email || !password || !role){
        return next(new ErrorHandler("Enter Complete Details!",400))
    }
    const user = await User.findOne({email})
    if(!user){
        return next(new ErrorHandler("User not found!",400))        
    }
    const checkPass = await bcrypt.compare(password,user.password)
    if(!checkPass){
        return    next(new ErrorHandler("Wrong Email or Password!",400))                
    }
    sendJwtToken(user,200,res,"User logged in successfully!")
})

const logout  = (req,res)=>{
    res.status(201).cookie("token","",{httpOnly:true}).json({
        success:true,
        message:"User logged out successfully!"
    })
}

const getUser  = asyncWrapper((req,res,next)=>{
    const user = req.user
    // console.log(user);
    res.status(200).json({
        success:true,
        user
    })
})

// const googleAuth = asyncWrapper((res,rees))

export {register,login,logout,getUser}
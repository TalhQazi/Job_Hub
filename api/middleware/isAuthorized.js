import jwt  from "jsonwebtoken";
import ErrorHandler from "../error/errorHandler.js"
import asyncWrapper from "express-async-handler"
import { User } from "../models/userSchema.js";


export const isAuthorized = asyncWrapper(async (req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        throw new ErrorHandler("User not authorized!",400)
        next()
    }
    const payload = jwt.verify(token,"ABCD")
    req.user = await User.findOne({_id:payload.id})
    next()
})
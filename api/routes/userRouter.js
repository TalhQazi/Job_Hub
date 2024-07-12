import {  Router } from "express";
import { register,login,logout, getUser } from "../controllers/userController.js";
import {isAuthorized} from "../middleware/isAuthorized.js"
import passport from "passport";

const userRouter = Router()
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/logout",isAuthorized,logout)
userRouter.get("/getuser",isAuthorized,getUser)
userRouter.get("/auth/google",passport.authenticate("google",{
    scope:["profile"]
}))
userRouter.get("/auth/google/redirect",passport.authenticate('google'),(req,res)=>{
    console.log("Hello");
})


export default userRouter

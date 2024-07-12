import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import cors from "cors"
import {connectDb} from "./database/dbCon.js"
import {errorMiddleware} from "./error/errorHandler.js"
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationsRouter from "./routes/applicationRoutes.js"
import passport from "passport"

const app = express()
const CORSoptions = {
    origin:"http://localhost:5173",
    methods:["GET","POST","DELETE","PUT"],
    credentials:true
}

dotenv.config({
    path:"./config/config.env"
})

app.use(cookieParser())
app.use(cors(CORSoptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))

app.use("/api/users",userRouter)
app.use("/api/jobs",jobRouter)
app.use("/api/apps",applicationsRouter)

//Google Redirect

app.use(errorMiddleware)

// app.use("/api/applications",applicationRouter)
// app.use("/api/jobs",jobRouter)

connectDb()

export default app
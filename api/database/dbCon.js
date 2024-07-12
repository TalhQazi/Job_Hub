import mongoose from "mongoose";

export const connectDb = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Job_Seeker_Db"
    }).then(()=>{
        console.log("Successfully Connected to Database!");
    }).catch((err)=>{
        console.log(`Cannot Connect to database due to : ${err}`);
    })
}
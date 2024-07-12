import mongoose, { Mongoose } from "mongoose";

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide the title!"],
        minLength:[3,"Please Provide atleast 3 characters! "]
        
    },
    description:{
        type:String,
        required:[true,"Description is required!"]
    },
    category:{
        type:String,
        required:[true,"Category is required!"]
    },
    country:{
        type:String,
        required:[true,"Country is required!"]
    },
    city:{
        type:String,
        required:[true,"City is required!"]
    },
    location:{
        type:String,
        required:[true,"Location is required!"]        
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Salary should be more than 999rs"]
    },
    salaryFrom:{
        type:Number
    },
    salaryTo:{
        type:Number,
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPosted:{
        type:Date,
        default:Date.now()
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
})

export const Job = mongoose.model("Job",jobSchema)
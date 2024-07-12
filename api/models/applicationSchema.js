import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name!"]
    },
    email:{
        type:String,
        validator:[validator.isEmail,"Please provide a valid email!"],
        required:[true,"Please provide a email!"]
    },
    coverLetter:{
        type:String,
        required:[true,"Please provide a cover letter"],
        minLength:[20,"Minimum 20 letters are required for a cover letter!"]

    },
    phone:{
        type:String,
        reqired:true
    },
    address:{
        type:String,
        required:true
    },
    resume:{
        publicId:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicant:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },
    employer:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }

})

export const Application = mongoose.model("Application",applicationSchema)
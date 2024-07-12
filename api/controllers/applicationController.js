import asyncWrapper from "express-async-handler";
import { Application } from "../models/applicationSchema.js";
import ErrorHandler  from "../error/errorHandler.js"
import cloudinary from "cloudinary"
import { Job } from "../models/jobSchema.js";

const employerGetAllApplications = asyncWrapper(async (req, res, next) => {
    const { role } = req.user
    if (role == "Job Seeker") {
        return new ErrorHandler("Job Seeker are not allowed", 400)
    }
    const { _id } = req.user
    const myApplications = await Application.find({ "employer.user": _id })
    res.status(200).json({
        success: true,
        myApplications
    })
})

const applicantGetAllApplications = asyncWrapper(async (req, res, next) => {
    const { role } = req.user
    if (role == "Employer") {
        return new ErrorHandler("Employers are not allowed to access this resource!",400)
    }
    const { _id } = req.user
    const myApplications = await Application.find({ "applicant.user": _id })
    res.status(200).json({
        success: true,
        myApplications

    })
})

const jobSeekerDeletingApplication = asyncWrapper(async (req, res, next) => {
    const { role } = req.user
    if (role == "Employer") {
        return new ErrorHandler("Employers are not allowed to access this resource!",400)
    }
    const { id } = req.params
    const application = await Application.findById(id)
    if (!application) {
        return new ErrorHandler("Oops Application not found!",400)
    }
    await application.deleteOne()
    res.status(200).json({
        success:true,
        message:"Application deleted successfully"
    })

})

const postApplication = asyncWrapper(async(req,res,next)=>{
    const { role } = req.user
    const {name,email,address,phone,coverLetter,jobId} = req.body

    if (role == "Employer") {
        return next(new ErrorHandler("Employers are not allowed to access this resource!",400))
    }
    // console.log(req.files);
    if(!req.files){
        return next(new ErrorHandler("Please upload your CV in Image format",400))
    }
    const {resume} = req.files
    const allowedFormats = ["image/jpg","image/jpeg","image/webp","image/png"]
    // console.log(resume);
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("Only supported formats are JPG,WEBP and PNG",400))
    }
    const cloudResponse = await cloudinary.uploader.upload(resume.tempFilePath)
    if(!cloudResponse || cloudResponse.error){
        return next(new ErrorHandler("Cannot upload to cloudinary",500))
    }
    const applicant = {
         user:req.user._id,
         role:"Job Seeker"
    }
    if(!jobId){
        return next(new ErrorHandler("oops job not found!",400))
    }
    const jobDetails = await Job.findById(jobId)
    if(!jobDetails){
        return new ErrorHandler("Job not found!",400)
    }
    const employer = {
        user: jobDetails.postedBy,
        role:"Employer"
    }
    if(!name || !email || !phone || !coverLetter || !address || !applicant || !employer || !resume){
        return new ErrorHandler("Enter all deatils!",400)
    }
    const public_id = await cloudResponse.public_id
    const url = cloudResponse.secure_url
    const application = await Application.create({
        name,
        email,
        address,
        coverLetter,
        phone,
        applicant,
        employer,
        resume:{
            publicId:public_id,
            url
        }
    })
    res.status(200).json({
        success:true,
        application
    })
})


export {employerGetAllApplications,applicantGetAllApplications,jobSeekerDeletingApplication,postApplication}
import asyncWrapper from "express-async-handler";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../error/errorHandler.js";

const getAllJobs = asyncWrapper(async (req, res) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

const postJob = asyncWrapper(async (req, res, next) => {
  const { role } = req.user;
  if (role == "Job Seeker") {
    return next(
      new ErrorHandler(
        "You are not authorized to post a job. Only Employers can post a job!",
        400
      )
    );
  }
  const {
    title,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  const description = req.body.desc
  // console.log(title, description, category, country, city, location);
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide all the details", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(new ErrorHandler("Please provide the salary details!", 400));
  }
  if (salaryFrom && salaryTo && fixedSalary) {
    return next(new ErrorHandler("Please provide one form of salary", 400));
  }

  const id = req.user._id;
  const postedBy = id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job created Successfully!",
    job,
  });
});

const getMyJobs = asyncWrapper(async (req, res, next) => {
  console.log("I am at line 1st");
  const { role } = req.user;
  if (role == "Job Seeker") {
    return next(
      new ErrorHandler(
        "You are not authorized to post a job. Only Employers can post a job!",
        400
      )
    );
  }
  console.log(req.user._id);
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs
  });
});

const updateJob = asyncWrapper(async (req,res,next) => {
  const { role } = req.user;
  if (role == "Job Seeker") {
    return next(
      new ErrorHandler(
        "You are not authorized to post a job. Only Employers can post a job!",
        400
      )
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops Job not found!", 400));
  }
  let Updatedjob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });
  if (Updatedjob) {
    res.status(200).json({
      success: true,
      Updatedjob,
    });
  }
});

const deleteJob = asyncWrapper(async(req,res,next)=>{
    const { role } = req.user;
    if (role == "Job Seeker") {
      return next(
        new ErrorHandler(
          "You are not authorized to delete a job. Only Employers can delete a job!",
          400
        )
      );
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Oops Job not found!", 400));
    }
    let DeletedJob  = await Job.findByIdAndDelete(id)
    res.status(200).json({
        success:true,
        DeletedJob
    })  
})

const getJobDetails = asyncWrapper(async (req,res,next)=>{
  const {id} = req.params
  const job = await Job.findById(id)
  // console.log(job);
  if(!job){
    return next(new ErrorHandler("Oops job not found"),400)
  }
  res.status(200).json({
    success:true,
    job
  })
})

export { getAllJobs, postJob, getMyJobs, updateJob,deleteJob ,getJobDetails};

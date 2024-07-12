import express from "express"
import { employerGetAllApplications,applicantGetAllApplications,jobSeekerDeletingApplication, postApplication } from "../controllers/applicationController.js"
import {isAuthorized} from "../middleware/isAuthorized.js"
import { postJob } from "../controllers/jobController.js"

const router = express.Router()

router.get("/jobseeker/getall",isAuthorized,applicantGetAllApplications)
router.get("/employer/getall",isAuthorized,employerGetAllApplications)
router.delete("/deletejob/:id",isAuthorized,jobSeekerDeletingApplication)
router.post("/postApplication",isAuthorized,postApplication)

export default router
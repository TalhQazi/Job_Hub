import  Express  from "express";
import { getAllJobs,postJob,getMyJobs,updateJob, deleteJob, getJobDetails } from "../controllers/jobController.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
const router = Express.Router()


router.get("/getmyjobs",isAuthorized,getMyJobs)
router.get("/getAll",getAllJobs)
router.post("/postJob",isAuthorized,postJob)
router.get("/:id",isAuthorized,getJobDetails)
router.put("/update/:id",isAuthorized,updateJob)
router.delete("/delete/:id",isAuthorized,deleteJob)


export default router
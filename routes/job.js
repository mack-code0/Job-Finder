const express = require("express")

const router = express.Router()

const JobController = require("../controllers/jobs")
const auth = require("../middleware/auth")


router.get("/", JobController.getIndex)

router.get("/about", JobController.getAbout)

router.get("/job-listing", JobController.getJobListing)

router.get("/job-details/:jobId", JobController.getJobDetails)

router.get("/contact", JobController.getContact)




module.exports = router
const express = require("express")

const router = express.Router()

const JobController = require("../controllers/jobs")


router.get("/", JobController.getIndex)

router.get("/about", JobController.getAbout)

router.get("/job-listing", JobController.getJobListing)

router.get("/job-details", JobController.getContact)

router.get("/contact", JobController.getContact)


module.exports = router
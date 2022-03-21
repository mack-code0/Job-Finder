const express = require("express")

const router = express.Router()

const EmployeeController = require("../controllers/employee")

const Auth = require("../middleware/auth")


router.get("/job-application/:jobId", Auth.checkisLoggedIn, Auth.checkEmployeeMode, EmployeeController.getJobApplication)

router.post("/job-application", Auth.checkisLoggedIn, Auth.checkEmployeeMode, EmployeeController.postJobApplication)

module.exports = router
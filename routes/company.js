const express = require("express")

const router = express.Router()
const CompanyController = require("../controllers/company")
const Auth = require("../middleware/auth")


router.post("/delete-job", Auth.checkisLoggedIn, Auth.checkCompanyMode, CompanyController.deleteJob)

router.get('/create-job', Auth.checkisLoggedIn, Auth.checkCompanyMode, CompanyController.getCreateJobPage)

router.get('/edit-job/:jobId', Auth.checkisLoggedIn, Auth.checkCompanyMode, CompanyController.getEditJobPage)

router.post('/create-job', Auth.checkisLoggedIn, Auth.checkCompanyMode, CompanyController.createJob)

router.post("/edit-job", Auth.checkisLoggedIn, Auth.checkCompanyMode, CompanyController.editJob)


module.exports = router
const express = require("express")

const router = express.Router()
const EmployerController = require('../controllers/employer')

router.get('/create-job', EmployerController.getCreateJobPage)

router.post('/create-job', EmployerController.createJob)

module.exports = router
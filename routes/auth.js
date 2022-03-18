const express = require("express")

const router = express.Router()
const AuthController = require('../controllers/auth')

router.get('/signup/employer', AuthController.getEmployerSignup)
router.post('/signup/employer', AuthController.postEmployerSignup)

router.get('/signup/employee', AuthController.getEmployeeSignup)
router.post('/signup/employee', AuthController.postEmployeeSignup)


module.exports = router
const express = require("express")

const router = express.Router()
const AuthController = require('../controllers/auth')

const { body } = require("express-validator")

router.get("/signup", AuthController.getSignup)

router.get("/login", AuthController.getLogin)

router.post("/login/company",
    [
        body("email", "Invalid Email").isEmail().normalizeEmail(),
        body("password").isLength({ min: 1 }).withMessage("Please enter a password")
    ],
    AuthController.postLoginCompany)

router.post("/login/employee",
    [
        body("email", "Invalid Email").isEmail().normalizeEmail(),
        body("password").isLength({ min: 1 }).withMessage("Please enter a password")
    ],
    AuthController.postLoginEmployee)

router.post("/signup/employee",
    [
        body("email", "Invalid Email").isEmail().normalizeEmail(),
        body("name").isLength({ min: 1 }).withMessage("Please enter a Name"),
        body('password', 'Please enter a password with only numbers and text at least 5 characters').isLength({ min: 3 }).isAlphanumeric(),
        body("c_password").custom((value, { req }) => {
            if(value!==req.body.password){
                throw new Error("Passwords do not Match!")
            }
            return true
        })
    ],
    AuthController.postSignupEmployee)

router.post("/signup/company", AuthController.postSignupCompany)



module.exports = router
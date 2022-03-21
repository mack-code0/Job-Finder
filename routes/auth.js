const express = require("express")

const router = express.Router()
const AuthController = require('../controllers/auth')

const { body } = require("express-validator")
const { Company, Employee } = require("../models/user")




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
        body("email", "Invalid Email").isEmail().normalizeEmail()
            .custom(async (value, { req }) => {
                const user = await Employee.findOne({ email: value })
                if (user) {
                    return Promise.reject("Email is already registered!")
                }
            }),
        body("name").isLength({ min: 4 }).withMessage("Please enter a Name with at least 4 characters"),
        body('password', 'Please enter a password with only numbers and text at least 5 characters').isLength({ min: 3 }).isAlphanumeric(),
        body("c_password").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not Match!")
            }
            return true
        })
    ],
    AuthController.postSignupEmployee)

router.post("/signup/company",
    [
        body("email", "Invalid Email").isEmail().normalizeEmail()
            .custom(async (value, { req }) => {
                const user = await Company.findOne({ email: value })
                if (user) {
                    return Promise.reject("Email is already registered!")
                }
            }),
        body("name").isLength({ min: 4 }).withMessage("Please enter a Name with at least 4 characters"),
        body("description").isLength({min: 5, max: 400}).withMessage("Description must be at least 5 characters and less than 400 characters").trim(),
        body("website").isURL().withMessage("Enter a valid website"),
        body('password', 'Please enter a password with only numbers and text at least 5 characters').isLength({ min: 3 }).isAlphanumeric(),
        body("c_password").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not Match!")
            }
            return true
        })
    ],
    AuthController.postSignupCompany)


router.post("/logout", AuthController.logout)


module.exports = router
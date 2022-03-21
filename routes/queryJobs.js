const express = require("express")

const router = express.Router()

const QueryJobsController = require("../controllers/queryJobs")
const Auth = require("../middleware/auth")

router.post("/change-location", Auth.checkisLoggedIn, QueryJobsController.changeLocation)


module.exports = router
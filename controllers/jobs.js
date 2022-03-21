const Job = require("../models/job")
const errorHandler = require("../util/error_handler")

exports.getIndex = (req, res, next) => {
    res.render("index", {
        path: "/",
        title: "Home"
    })
}

exports.getAbout = (req, res, next) => {
    res.render("about", {
        path: "/about",
        title: "About"
    })
}

exports.getJobListing = async (req, res, next) => {
    try {
        const jobs = await Job.find()

        res.render("job-listing", {
            path: "/job-listing",
            title: "Job Listing",
            jobs
        })
    } catch (error) {
        errorHandler(error, next)
    }
}

exports.getJobDetails = async (req, res, next) => {
    const { jobId } = req.params
    try {
        const job = await Job.findById(jobId).populate("company", "email website description name -_id")

        const jobHolder = { ...job._doc }
        jobHolder.createdAt = job.createdAt.toString().split(' ').filter((val, index) => index < 4 && index != 0).join(' ')

        res.render("job-details", {
            path: "/job-details",
            title: job.role || 'Job Details',
            job: jobHolder
        })
    } catch (error) {
        errorHandler(error, next)
    }
}

exports.getContact = (req, res, next) => {
    res.render("contact", {
        path: "/contact",
        title: "Contact Us"
    })
}

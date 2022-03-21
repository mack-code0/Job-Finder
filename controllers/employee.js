const Job = require("../models/job")
const JobApplication = require("../models/job-application")
const errorHandler = require("../util/error_handler")


exports.getJobApplication = async (req, res, next) => {
    const { jobId } = req.params
    try {
        // check if user already applied for job
        const checkIfApplied = await JobApplication.findOne({employee: req.user._id, job: jobId})
        if(checkIfApplied){
            // Flash message here
            return res.redirect("/")
        }
        const job = await Job.findById(jobId).lean()
        res.render("employee/job-application", {
            path: "/job-application",
            title: "Job Application",
            job
        })
    } catch (error) {
        errorHandler(error, next)
    }
}

exports.postJobApplication = async (req, res, next) => {
    const { jobId, full_name, cover_letter } = req.body
    try {
        const jobApply = await new JobApplication({ full_name, cover_letter, employee: req.user._id, job: jobId })
        await jobApply.save()
        console.log(jobApply);
        res.redirect("/")
    } catch (error) {
        errorHandler(error, next)
    }
}

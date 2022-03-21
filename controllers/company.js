const Job = require("../models/job");
const errorHandler = require("../util/error_handler");

exports.deleteJob = async (req, res, next) => {
    const { jobId } = req.body
    try {
        const deleteJob = await Job.findByIdAndDelete(jobId)
        console.log(deleteJob);
        res.redirect("/job-listing")
    } catch (error) {
        errorHandler(error, next)
    }
}


exports.getCreateJobPage = (req, res, next) => {
    res.render("create-job", {
        path: "/create-job",
        title: "Create Job",
        edit: false
    })
}

exports.getEditJobPage = async (req, res, next) => {
    const { jobId } = req.params
    try {
        const job = await Job.findById(jobId)
        res.render("create-job", {
            path: "/edit-job",
            title: "Edit Job",
            edit: true,
            job
        })
    } catch (error) {
        errorHandler(error, next)
    }
}

exports.editJob = async (req, res, next) => {
    const { jobId } = req.body
    try {
        const job = await Job.findById(jobId)
        if (!job) {
            // Flash message here
            return res.redirect("/")
        }
        if (job.company.toString() !== req.user._id.toString()) {
            // Flash message here
            return res.redirect("/")
        }

        const data = jobInfoHandler(req.body)
        Object.assign(job, { ...data })

        await job.save()
        res.redirect("/job-details/" + jobId)
    } catch (error) {
        errorHandler(error, next)
    }
}

exports.createJob = async (req, res, next) => {
    const data = jobInfoHandler(req.body)
    const job = new Job({ ...data, company: req.user._id })

    try {
        await job.save()
        res.redirect("/job-listing")
    } catch (error) {
        errorHandler(error, next)
    }
}



const jobInfoHandler = (form) => {
    const {
        agency,
        role,
        country,
        city,
        salary_from,
        salary_to,
        vacancy_av,
        nature,
        description,
        abilities,
        experience,
    } = form

    const location_obj = { country, city }
    const salary_obj = { from: salary_from, to: salary_to }
    const abilities_array = abilities.split('\r\n').filter(val => val != '')
    const experience_array = experience.split('\r\n').filter(val => val != '')

    return ({
        agency,
        role,
        location: location_obj,
        salary: salary_obj,
        description,
        abilities: abilities_array,
        experience: experience_array,
        vacancy_av,
        nature
    })
}

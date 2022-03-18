const { default: mongoose } = require("mongoose")
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

exports.getJobListing = (req, res, next) => {
    Job.find()
        .then(jobs => {
            res.render("job-listing", {
                path: "/job-listing",
                title: "Job Listing",
                jobs
            })
        })
        .catch(error => {
            errorHandler(error, next)
        })
}

exports.getJobDetails = (req, res, next) => {
    const { jobId } = req.params
    Job.findById(jobId)
    .populate("company", "email website description name -_id")
        .then(job => {
            const jobHolder = {...job._doc}
            jobHolder.createdAt = job.createdAt.toString().split(' ').filter((val, index) => index<4 && index!=0).join(' ')

            res.render("job-details", {
                path: "/job-details",
                title: job.role || 'Job Details',
                job: jobHolder
            })
        })
        .catch(error => {
            errorHandler(error, next)
        })
}

exports.getContact = (req, res, next) => {
    res.render("job-details", {
        path: "/job-details",
        title: "Job Details"
    })
}

exports.getCreateJobPage = (req, res, next) => {
    res.render("create-job", {
        path: "/create-job",
        title: "Create Job"
    })
}

exports.createJob = (req, res, next) => {
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
        experience
    } = req.body

    const location_obj = { country, city }
    const salary_obj = { from: salary_from, to: salary_to }
    const abilities_array = abilities.split('\r\n').filter(val=>val!='')
    const experience_array = experience.split('\r\n').filter(val=>val!='')

    const job = new Job({
        role,
        agency,
        location: location_obj,
        salary: salary_obj,
        description,
        abilities: abilities_array,
        experience: experience_array,
        vacancy_av,
        nature,
        company: '6234c693e41c284fab65faba'
    })

    job.save()
        .then(result => {
            console.log(result);
            res.redirect("/")
        }).catch(error => {
            errorHandler(error, next)
        })

}
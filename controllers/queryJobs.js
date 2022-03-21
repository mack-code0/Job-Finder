const Job = require("../models/job")
const error_handler = require("../util/error_handler")
exports.changeLocation = async (req, res, next) => {
    const { location } = req.body
    try {
        const jobs = await Job.find().where({ "location.country": location }).lean()
        
        const jobHolder = [...jobs]
        jobHolder.forEach(job=>{
            let jb = job.createdAt
            job.createdAt = jb.toString().split(' ').filter((val, index) => index < 4 && index != 0).join(' ')
            console.log(job.createdAt);
        })
        
        res.status(201).json({ jobs: jobHolder, companyMode: req.session.companyMode  })
    } catch (error) {
        error_handler(error, next)
    }
}
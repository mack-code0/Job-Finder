const Job = require('../models/job')
const errorHandler = require("../util/error_handler")

exports.getCreateJobPage = (req, res, next) => {
    res.render("employer/create-job", {
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
        nature
    })

    job.save()
        .then(result => {
            console.log(result);
            res.redirect("/")
        }).catch(error => {
            errorHandler(error, next)
        })

}




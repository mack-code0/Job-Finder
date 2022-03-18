const {Employer, Employee} = require("../models/user")
const errorHandler = require("../util/error_handler")

exports.getEmployerSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: "/signup",
        title: "Signup",
        mode: "employer"
    })
}

exports.getEmployeeSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: "/signup",
        title: "Signup",
        mode: ''
    })
}

exports.postEmployerSignup = (req, res, next) => {
    const {email, password, name, about, website} = req.body

    const employer = new Employer({
        email,
        password,
        name,
        about,
        website
    })

    employer.save()
    .then((result) => {
        console.log(result);
        res.redirect("/login")
    }).catch((err) => {
        errorHandler(err, next)
    });
}

exports.postEmployeeSignup = (req, res, next) => {
    const {email, password, name, about, website} = req.body

    const employer = new Employee({
        email,
        password,
        name
    })

    employer.save()
    .then((result) => {
        console.log(result);
        res.redirect("/login")
    }).catch((err) => {
        errorHandler(err, next)
    });
}
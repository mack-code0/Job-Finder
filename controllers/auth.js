const { Company, Employee } = require("../models/user")
const errorHandler = require("../util/error_handler")
const bcrypt = require("bcryptjs")


exports.getSignup = (req, res, next) => {
    console.log(req.session);
    const mode = req.query.mode || ''
    res.render('auth/signup', {
        path: "/signup",
        title: "Signup",
        mode
    })
}

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: "/login",
        title: "Login",
    })
}



exports.postLoginCompany = (req, res, next) => {
    const { email, password } = req.body

    Company.findOne({ email })
        .then(user => {
            if (!user) {
                // Add flash message here
                return res.redirect('/login')
            }

            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    // Add Flash Message here
                    return res.redirect('/login')
                }
    
                req.session.isLoggedIn = true
                req.session.company = user.isCompany
                req.session.user = user
                res.redirect("/")
            })
        })
        .catch(error => {
            errorHandler(error, next)
        })
}

exports.postLoginEmployee = (req, res, next) => {
    const { email, password } = req.body

    Employee.findOne({ email })
        .then(user => {
            if (!user) {
                // Add flash message here
                return res.render('auth/login', {
                    path: "/login",
                    title: "Login",
                })
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        // Add Flash Message here
                        return res.redirect('/login')
                    }

                    req.session.isLoggedIn = true
                    req.session.company = user.isCompany
                    req.session.user = user
                    res.redirect("/")
                })
        })
        .catch(error => {
            errorHandler(error, next)
        })
}

exports.postSignupEmployee = (req, res, next) => {
    const { email, password, name } = req.body

    bcrypt.hash(password, 12)
        .then(hashed => {
            const employee = new Employee({
                email,
                password: hashed,
                name
            })

            return employee.save()
        })
        .then((result) => {
            console.log(result);
            res.redirect("/login")
        })
        .catch((err) => {
            errorHandler(err, next)
        });
}

exports.postSignupCompany = (req, res, next) => {
    const { email, password, name, description, website } = req.body


    bcrypt.hash(password, 12)
        .then(hashed => {
            const company = new Company({
                email,
                password: hashed,
                name,
                description,
                website
            })

            return company.save()
        })
        .then((result) => {
            console.log(result);
            res.redirect("/login")
        })
        .catch((error) => {
            errorHandler(error, next)
        });
}

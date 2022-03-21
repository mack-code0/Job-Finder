const { Company, Employee } = require("../models/user")
const errorHandler = require("../util/error_handler")
const bcrypt = require("bcryptjs")


exports.getSignup = (req, res, next) => {
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



exports.postLoginCompany = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await Company.findOne({ email })
        if (!user) {
            // Add flash message here
            return res.redirect('/login')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            // Add Flash Message here
            return res.redirect('/login')
        }

        req.session.isLoggedIn = true
        req.session.companyMode = user.isCompany
        req.session.user_id = user._id.toString()
        res.redirect("/")
    } catch (error) {
        errorHandler(error, next)
    }
}

exports.postLoginEmployee = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await Employee.findOne({ email })
        if (!user) {
            // Add flash message here
            return res.redirect('/login')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            // Add Flash Message here
            return res.redirect('/login')
        }

        req.session.isLoggedIn = true
        req.session.companyMode = false
        req.session.user_id = user._id.toString()
        res.redirect("/")
    } catch (error) {
        errorHandler(error, next)
    }
}

exports.postSignupEmployee = async (req, res, next) => {
    const { email, password, name } = req.body

    try {
        const hashed = await bcrypt.hash(password, 12)
        const employee = new Employee({
            email,
            password: hashed,
            name
        })

        const saveEmployee = await employee.save()
        console.log(saveEmployee);
        res.redirect("/login")
    } catch (error) {
        errorHandler(error, next)
    }
}

exports.postSignupCompany = async (req, res, next) => {
    const { email, password, name, description, website } = req.body

    try {
        const hashed = await bcrypt.hash(password, 12)
        const company = new Company({
            email,
            password: hashed,
            name,
            description,
            website
        })

        const saveCompany = await company.save()
        console.log(saveCompany);
        res.redirect("/login")
    } catch (error) {
        errorHandler(error, next)
    }
}


exports.logout = (req, res, next) => {
    req.session.destroy(error=>{
        if(error){
            errorHandler(error, next)
        }
        
        res.redirect("/login")
    })
}
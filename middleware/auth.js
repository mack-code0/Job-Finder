exports.checkCompanyMode = (req, res, next) => {
    if (req.session.companyMode !== true) {
        return res.redirect("/")
    }

    next()
}

exports.checkEmployeeMode = (req, res, next) => {
    if (req.session.companyMode === false) {
        return next()
    }

    res.redirect("/")
}

exports.checkisLoggedIn = (req, res, next) => {
    if(req.session.isLoggedIn !== true){
        return res.redirect("/login")
    }

    next()
}
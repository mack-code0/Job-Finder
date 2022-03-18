exports.checkMode = (req, res, next) => {
    if (req.session.company !== true) {
        return res.redirect("/")
    }

    next()
}

exports.checkisLoggedIn = (req, res, next) => {
    if(req.session.isLoggedIn !== true){
        return res.redirect("/login")
    }

    next()
}
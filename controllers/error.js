exports.get404 = (req, res, next) => {
    res.render("errors/404", {
        path: "/404",
        title: "Page Not Found"
    })
}

exports.get500 = (error, req, res, next)=>{
    res.render("errors/500", {
        path: "/500",
        title: "An Error Occured"
    })
}
exports.getIndex = (req, res, next)=>{
    res.render("index", {
        path: "/",
        title: "Home"
    })
}

exports.getAbout = (req, res, next)=>{
    res.render("about", {
        path: "/about",
        title: "About"
    })
}

exports.getJobListing = (req, res, next)=>{
    res.render("job-listing", {
        path: "/job-listing",
        title: "Job Listing"
    })
}

exports.getContact = (req, res, next)=>{
    res.render("contact", {
        path: "/contact",
        title: "Contact"
    })
}

exports.getContact = (req, res, next)=>{
    res.render("job-details", {
        path: "/job-details",
        title: "Job Details"
    })
}
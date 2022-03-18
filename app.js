const express = require("express")
const path = require("path")
const rootDir = require("./util/path")
const csrf = require("csurf")
const mongoose = require("mongoose")
const app_session = require("express-session")
const sessionStore = require("connect-mongodb-session")(app_session)
const flash = require("connect-flash")


const app = express()
const MONGODB_URI = "mongodb://127.0.0.1:27017/jobcreator"

const store = new sessionStore({
    uri: MONGODB_URI,
    collection: "sessions",
})
const csrfProtection = csrf()

app.set("view engine", "ejs")
app.use(express.static(path.join(rootDir, "public")))

app.use(express.urlencoded({ extended: true }))

app.use(app_session({
    secret: "My Secret Key",
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(csrfProtection)
app.use(flash())


app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.companyMode = req.session.company
    res.locals.csrfToken = req.csrfToken()
    next()
})

const AuthRoutes = require("./routes/auth")
const JobRoutes = require("./routes/job")
const ErrorController = require("./controllers/error")


app.use(AuthRoutes)
app.use(JobRoutes)


app.use(ErrorController.get404)
app.use(ErrorController.get500)


mongoose.connect(MONGODB_URI)
    .then(res => {
        console.log("connected")
        app.listen(4040)
    })
    .catch(err => {
        console.log(err);
        throw err
    })
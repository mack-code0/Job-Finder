const express = require("express")
const path = require("path")
const rootDir = require("./util/path")
const app = express()
const mongoose = require("mongoose")


app.set("view engine", "ejs")
app.use(express.static(path.join(rootDir, "public")))

app.use(express.urlencoded({extended: true}))


const AuthRoutes = require("./routes/auth")
const JobRoutes = require("./routes/job")
const EmployerRoutes = require("./routes/employer")



app.use(AuthRoutes)
app.use(JobRoutes)
app.use(EmployerRoutes)



mongoose.connect("mongodb://127.0.0.1:27017/jobcreator")
.then(res=>{
    console.log("connected")
    app.listen(4040)
})
.catch(err=>{
    console.log(err);
    throw err
})
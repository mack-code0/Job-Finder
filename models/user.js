const mongoose = require('mongoose')
const Schema = mongoose.Schema


const employerSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    about: {type: String, required: true},
    website: {type: String, required: true}
})

const employeeSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true}
})


exports.Employer = mongoose.model('Employer', employerSchema)
exports.Employee = mongoose.model('Employee', employeeSchema)

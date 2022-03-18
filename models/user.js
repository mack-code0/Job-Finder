const mongoose = require('mongoose')
const Schema = mongoose.Schema


const companySchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    website: {type: String, required: true},
    isCompany: {type: Boolean, default: true}
})

const employeeSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true}
})


exports.Company = mongoose.model('Company', companySchema)
exports.Employee = mongoose.model('Employee', employeeSchema)

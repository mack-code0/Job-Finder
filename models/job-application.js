const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobApplicationSchema = new Schema({
    full_name: { type: String, required: true },
    cover_letter: {type: String, required: true},
    employee: { type: mongoose.Types.ObjectId, ref: "Employee" },
    job: { type: mongoose.Types.ObjectId, ref: "Job" }
}, { timestamps: { createdAt: true, updatedAt: false } })

module.exports = mongoose.model('jobApplication', jobApplicationSchema)
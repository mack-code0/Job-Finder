const mongoose = require('mongoose')
const Schema = mongoose.Schema


const jobSchema = new Schema({
    role: { type: String, required: true },
    agency: { type: String, required: true },
    location: {
        country: { type: String, required: true },
        city: { type: String, required: true }
    },
    salary: {
        from: { type: Number, required: true },
        to: { type: Number, required: true }
    },
    description: { type: String, required: true },
    abilities: [{ type: String, required: true }],
    experience: [{ type: String, required: true }],
    vacancy_av: { type: Number, required: true },
    nature: { type: String, required: true },
    company: {type: mongoose.Types.ObjectId, ref: "Company"}
}, { timestamps: true })


module.exports = mongoose.model('Job', jobSchema)
const mongoose = require('mongoose')

const Specialty = mongoose.model('Specialty', {
    specialty: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Specialty;
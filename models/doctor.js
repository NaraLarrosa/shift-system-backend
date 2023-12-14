const mongoose = require('mongoose')

const Doctor = mongoose.model('Doctor', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    specialty: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Doctor;
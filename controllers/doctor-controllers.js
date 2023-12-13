const mongoose = require('mongoose')

const Doctor = mongoose.model('Doctor', {
    specialty: {
        type: String,
        required: true,
        trim: true
    },
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
})

module.exports = Doctor;
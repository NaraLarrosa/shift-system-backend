const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const shiftSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        trim: true
    },
    hour: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
    },
    doctor: {
        type: String,
        required: true,
        ref: 'Doctor'
    }
});

shiftSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Shift', shiftSchema);;
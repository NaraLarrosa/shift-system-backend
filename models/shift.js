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
        required: true,
        minlength: 5 
    },
    available: {
        type: Boolean,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    }
});

shiftSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Shift', shiftSchema);;
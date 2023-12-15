const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    }
});

module.exports = shiftSchema;
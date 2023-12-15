const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const shiftSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        trim: true
    },
    hour: {
        type: String,
        required: true,
        trim: true
    },
    available: {
        type: Boolean,
        required: true,
        trim: true
    }
});

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = User;
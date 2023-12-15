// const mongoose = require('mongoose');

// const doctorSchema = mongoose.model('Doctor', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     surname: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     specialty: {
//         type: String,
//         required: true,
//         trim: true,
//         ref: 'Specialty'
//     }
// });

// module.exports = doctorSchema;

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
        trim: true,
        ref: 'Specialty'
    }
});

doctorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Doctor', doctorSchema);
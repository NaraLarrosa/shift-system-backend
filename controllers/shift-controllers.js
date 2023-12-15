const express = require('express');
const Shift = require('../models/user');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const createAvailableShift = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
        new HttpError('The data provided contains errors, please double-check your data.', 422)
        );
    };
    
    const { day, hour, desciption, available } = req.body;
    
    const createShift = new Shift({
        day,
        hour,
        desciption,
        available
    });
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createShift.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
        'The entry of the new shift was not successful; Try again.',
        500
        );
        return next(error);
    };
    res.status(201).json({ shift: createShift });
};

const updateAvailableShift = async (req, res, next) => {
    console.log('');
};

const deleteAvailableShift = async (req, res, next) => {

  console.log('');
};

const shiftByDoctor = async (req, res, next) => {

    console.log('');
};
  
const shiftByPatient = async (req, res, next) => {

    console.log('');
};

const shiftReservation = async (req, res, next) => {

    console.log('');
};

const shiftCancel = async (req, res, next) => {

    console.log('');
};

const cancellatioByPatient = async (req, res, next) => {

    console.log('');
};

exports.createAvailableShift = createAvailableShift;
exports.updateAvailableShift = updateAvailableShift;
exports.deleteAvailableShift = deleteAvailableShift;
exports.shiftByDoctor = shiftByDoctor;
exports.shiftByPatient = shiftByPatient;
exports.shiftReservation = shiftReservation;
exports.shiftCancel = shiftCancel;
exports.cancellatioByPatient = cancellatioByPatient;

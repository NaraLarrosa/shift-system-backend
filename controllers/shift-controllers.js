const express = require('express');
const Shift = require('../models/user');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { sendpasswordRecovery } = require('../emails/account')

const createAvailableShift = async (req, res, next) => {
    console.log('');
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

const Shift = require('../models/shift');
const User = require('../models/user');
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
    
    const { day, hour, description, available, doctor } = req.body;
    
    let createShift = new Shift({
        day,
        hour,
        description,
        available,
        doctor,
        canceled: false,
        user: ""
    });
    
    try {
      const existingShift = await Shift.findOne({ day, hour, doctor });
      if (existingShift) {
        return next(new HttpError('Existing shift!', 422));
      }
    } catch (err) {
      const error = new HttpError('Error checking existing shift.', 500);
      return next(error);
    };

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
    res.status(201).json(createShift);
};

const updateAvailableShift = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs, please check your data.',
        422)
      );
    };

    const { day, hour, description, available } = req.body;
    const shiftId = req.params.sid;

    let shift;
    try {
      shift = await Shift.findById(shiftId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update the shift.',
        500
      );
      return next(error);
    };

    shift.day = day;
    shift.hour = hour;
    shift.description = description;
    shift.available = available;

    try {
      await shift.save();
    } catch (err) {
      const error = new HttpError(
        'An error occurred, the shift could not be updated.',
        500
      );
      return next(error);
    };
    
    res.status(200).json({ shift });
};

const deleteAvailableShift = async (req, res, next) => {
    const shiftId = req.params.sid;

    let shift;
    try {
        shift = await Shift.findById(shiftId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete the shift.',
        500
      );
      return next(error);
    }
  
    if (!shift) {
      const error = new HttpError('Could not find shift for this id.',
        404);
      return next(error);
    }
  
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await Shift.deleteOne({ _id: shiftId}, {sess})
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        'An error occurred, could not delete this shift.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: 'Deleted shift.' });
};

const getShiftByDoctor = async (req, res, next) => {
    const doctorId = req.params.did;

    let shiftByDoctor;
    try {
      shiftByDoctor = await Shift.find({ 'doctor' : doctorId });  
    } catch (err) {
      const error = new HttpError(
        'Fetching shft failed, please try again later.',
        500
      );
      return next(error);
    }

    res.json({ shiftByDoctor });
};
  
const getShiftByPatient = async (req, res, next) => {
  const patientId = req.params.pid;

  let shiftByPatient;
  try {
    shiftByPatient = await Shift.find({ 'user' : patientId, canceled: false });  
  } catch (err) {
    const error = new HttpError(
      'Fetching patient failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({ shiftByPatient });
};

const shiftReservation = async (req, res, next) => {
    const sid = req.params.sid;

    let shift;
    try {
      shift = await Shift.findById(sid);
    } catch (err) {
        const error = new HttpError(
            'An error occurred, the shift was not found',
            500
        );
        return next(error);
    };

    if(shift.available === false) {
      const error = new HttpError(
        'Could not take the turn because is not available',
        404
      );
      return next(error);
    }

    shift.available = false;
    shift.user = req.user._id;
    shift.canceled = false;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await shift.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Could not take turn, please try again later.',
            500
        );
        return next(error);
    };

    res.status(201).json({ shift });
};

const shiftCancel = async (req, res, next) => {
    const sid = req.params.sid;

    let shift;
    try {
      shift = await Shift.findById(sid);
    } catch (err) {
        const error = new HttpError(
            'The shift was not found',
            500
        );
        return next(error);
    };

    if(shift.canceled === true) {
      const error = new HttpError(
        'The shift has already been canceled',
        404
      );
      return next(error);
    } else {
      shift.canceled = true;
      shift.available = true;
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await shift.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'The shift could not be canceled, please try again.',
            500
        );
        return next(error);
    };

    res.status(201).json({ shift });
};

const getCancellationByPatient = async (req, res, next) => {
    const pid = req.params.pid;

    let shifts;
    try {
      shifts = await Shift.find({user: pid, canceled: true}).populate('doctor').populate('user');
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not found the shifts.',
        500
      );
      return next(error);
    }
  
    if (!shifts) {
      const error = new HttpError('Could not find the shift for this id.',
        404);
      return next(error);
    }

    res.json({ shifts });

};

exports.createAvailableShift = createAvailableShift;
exports.updateAvailableShift = updateAvailableShift;
exports.deleteAvailableShift = deleteAvailableShift;
exports.getShiftByDoctor = getShiftByDoctor;
exports.getShiftByPatient = getShiftByPatient;
exports.shiftReservation = shiftReservation;
exports.shiftCancel = shiftCancel;
exports.getCancellationByPatient = getCancellationByPatient;

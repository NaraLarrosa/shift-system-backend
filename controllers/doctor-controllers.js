const HttpError = require('../models/http-error');
const Doctor = require('../models/doctor');
const Shift = require('../models/shift');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const getAllDoctors = async (req, res, next) => {
  let doctors;
  let limit = req.query.limit;
  let skip = req.query.skip;

  try {
    doctors = await Doctor.find()
      .limit(limit)
      .skip(skip)
      .populate('specialty');
  } catch (err) {
    const error = new HttpError(
      'Fetching doctors failed, please try again later.',
      500
    );
    return next(error);
  };

  res.json({ doctors: doctors.map(doctor => doctor.toObject({ getters: true })) });
};

const getDoctorById = async (req, res, next) => {
  const doctorId = req.params.did;

  let doctor;
  try {
      doctor = await Doctor.findById(doctorId).populate('specialty');
  } catch (err) {
    const error = new HttpError(
      'An error occurred, the admitted doctor was not found',
      500
    );
    return next(error);
  };

  if (!doctor) {
    const error = new HttpError(
      'The doctor was not located with the identification provided.',
      404
    );
    return next(error);
  };

  let shifts;
  try {
    shifts = await Shift.find({doctor: doctorId}).populate('doctor');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not found the shifts by doctor.',
      500
    );
    return next(error);
  }

  res.json({ doctor, shifts});
};

const addDoctor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return next(
      new HttpError('The data provided contains errors, please double-check your data.', 422)
      );
  };

  const { name, surname, dni, specialty } = req.body;

  try {
    const existingDoctor = await Doctor.find({ dni, specialty });

    if (existingDoctor.length !==0) {
      return next(new HttpError('Doctor with the same DNI and specialty already exists.', 422));
    }
  } catch (err) {
    const error = new HttpError('Error checking existing doctor; Try again.', 500);
    return next(error);
  }

  const addDoctor = new Doctor({
    name,
    surname,
    dni,
    specialty
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await addDoctor.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'The entry of the new doctor was not successful; Try again.',
      500
    );
    return next(error);
  };
  res.status(201).json(addDoctor);
};

const updateDoctor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs, please check your data.',
      422)
    );
  };

  const { name, surname, dni, specialty } = req.body;
  const doctorId = req.params.did;

  let doctor;
  try {
    doctor = await Doctor.findOne({ _id: doctorId });
    if (!doctor) {
      return next(
        new HttpError('Doctor not found.', 404)
      );
    };
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update the doctor.',
      500
    );
    return next(error);
  };

  doctor.name = name;
  doctor.surname = surname;
  doctor.dni = dni;
  doctor.specialty = specialty.value;

  try {
    await doctor.save();
  } catch (err) {
    const error = new HttpError(
      'An error occurred, the doctor could not be updated.',
      500
    );
    return next(error);
  };
  
  res.status(200).json(doctor);
};

exports.getAllDoctors = getAllDoctors;
exports.getDoctorById = getDoctorById;
exports.addDoctor = addDoctor;
exports.updateDoctor = updateDoctor;
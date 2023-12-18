const HttpError = require('../models/http-error');
const Doctor = require('../models/doctor');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const getAllDoctors = async (req, res, next) => {
  let doctors;
  try {
      doctors = await Doctor.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching doctors failed, please try again later.',
      500

    );
    return next(error);
  }
  res.json({ doctors: doctors.map(doctor => doctor.toObject({ getters: true })) });
};

const getDoctorById = async (req, res, next) => {
  const doctorId = req.params.did;

  let doctor;
  try {
      doctor = await Doctor.findById(doctorId);
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

  res.json({ doctor: doctor.toObject({ getters: true }) });
};

const addDoctor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return next(
      new HttpError('The data provided contains errors, please double-check your data.', 422)
      );
  };

  const { name, surname, dni, specialty } = req.body;

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
  res.status(201).json({ doctor: addDoctor });
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
    doctor = await Doctor.findById(doctorId);
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
  doctor.specialty = specialty;

  try {
    await doctor.save();
  } catch (err) {
    const error = new HttpError(
      'An error occurred, the doctor could not be updated.',
      500
    );
    return next(error);
  };
  
  res.status(200).json({ doctor: doctor.toObject({ getters: true }) });
};

exports.getAllDoctors = getAllDoctors;
exports.getDoctorById = getDoctorById;
exports.addDoctor = addDoctor;
exports.updateDoctor = updateDoctor;
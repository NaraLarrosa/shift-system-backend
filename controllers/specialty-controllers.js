const HttpError = require('../models/http-error');
const Specialty = require('../models/specialty');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const getSpecialties = async (req, res, next) => {
  let specialties;
  let limit = req.query.limit;
  let skip = req.query.skip;

  try {
    specialties = await Specialty.find({})
    .limit(limit)
    .skip(skip);
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    )
    return next(error);
  }
  res.json({ specialties: specialties.map(specialty => specialty.toObject({ getters: true })) });
};

const addSpecialties = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        'The data provided contains errors, please double-check your data.',
         422
      )
    );
  };

  const { name } = req.body;

  try {
    const existingSpecialty = await Specialty.find({ name });
    
    if (existingSpecialty.length !== 0) {
      return next(new HttpError('Specialty with the same name already exists.', 422));
    }
  } catch (err) {
    const error = new HttpError('Error checking existing specialty.', 500);
    return next(error);
  }

  const addSpecialty = new Specialty({
    name
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await addSpecialty.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'The entry of the new specialty was not successful; Try again.',
      500
    );
    return next(error);
  };
  res.status(201).json(addSpecialty);
};

exports.getSpecialties = getSpecialties;
exports.addSpecialties = addSpecialties;
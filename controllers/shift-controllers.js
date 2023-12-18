const express = require('express');
const Shift = require('../models/shift');
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
    
    const { day, hour, description, available } = req.body;
    
    let createShift = new Shift({
        day,
        hour,
        description,
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

// const updateAvailableShift = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return next(
//         new HttpError('Invalid inputs, please check your data.',
//         422)
//         );
//     };
    
//     const { day, hour, desciption, available } = req.body;
//     const shiftId = req.params.pid;
    
//     let shift;
//     try {
//         shift = await Shift.findById(shiftId);
//     } catch (err) {
//         const error = new HttpError(
//         'Something went wrong, could not update the shift.',
//         500
//         );
//         return next(error);
//     };
    
//     shift.day = day;
//     shift.hour = hour;
//     shift.desciption = desciption;
//     shift.available = available;

//     try {
//         await shift.save();
//     } catch (err) {
//         const error = new HttpError(
//         'An error occurred, the shift could not be updated.',
//         500
//         );
//         return next(error);
//     };
    
//     res.status(200).json({ shift: shift.toObject({ getters: true }) });
// };

// const deleteAvailableShift = async (req, res, next) => {
//     const shiftId = req.params.pid;

//     let shift;
//     try {
//         shift = await Shift.findById(shiftId).populate('shift');
//     } catch (err) {
//       const error = new HttpError(
//         'Something went wrong, could not delete the shift.',
//         500
//       );
//       return next(error);
//     }
  
//     if (!shift) {
//       const error = new HttpError('Could not find shift for this id.',
//         404);
//       return next(error);
//     }
  
//     try {
//       const sess = await mongoose.startSession();
//       sess.startTransaction();
//       await Shift.deleteOne({ _id: shiftId}, {sess})
//       await sess.commitTransaction();
//     } catch (err) {
//       const error = new HttpError(
//         'An error occurred, could not delete this shift.',
//         500
//       );
//       return next(error);
//     }
  
//     res.status(200).json({ message: 'Deleted shift.' });
// };

// const shiftByDoctor = async (req, res, next) => {

//     const shiftId = req.params.pid;

//     let shift;
//     try {
//         shift = await Shift.findById(shiftId);
//     } catch (err) {
//       const error = new HttpError(
//         'Something went wrong, could not delete the shift.',
//         500
//       );
//       return next(error);
//     }
  
//     if (!shift) {
//       const error = new HttpError('Could not find shift for this id.',
//         404);
//       return next(error);
//     }
  
//     try {
//       const sess = await mongoose.startSession();
//       sess.startTransaction();
//       await Shift.deleteOne({ _id: shiftId}, {sess})
//       await sess.commitTransaction();
//     } catch (err) {
//       const error = new HttpError(
//         'An error occurred, could not delete this shift.',
//         500
//       );
//       return next(error);
//     }
  
//     res.status(200).json({ message: 'Deleted shift.' });
// };
  
// const shiftByPatient = async (req, res, next) => {
//     const shiftId = req.params.pid;

//     let shift;
//     try {
//         shift = await Shift.findById(shiftId);
//     } catch (err) {
//         const error = new HttpError(
//         'An error occurred, the shift was not found',
//         500
//         );
//         return next(error);
//     };

//     if (!shift) {
//         const error = new HttpError(
//         'The shift was not located with the provided id.',
//         404
//         );
//         return next(error);
//     };

//     res.json({ shift: shift.toObject({ getters: true }) });
// };

// const shiftReservation = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return next(
//         new HttpError('The data provided contains errors, please double-check your data.', 422)
//       );
//     };
  
//     const { day, hour, description, available } = req.body;
  
//     const createdShift = new Shift({
//         day,
//         hour,
//         description,
//         available,
//     });

//     // if(shift === createdShift){
//     //     createdShift = null;
//     //     sout    
//     // }
  
//     try {
//       const sess = await mongoose.startSession();
//       sess.startTransaction();
//       await createdShift.save({ session: sess });
//       await sess.commitTransaction();
//     } catch (err) {
//       const error = new HttpError(
//         'The creation of the shift was not successful; Please try again.',
//         500
//       );
//       return next(error);
//     };
  
//     res.status(201).json({ shift: createdShift });
// };

// const shiftCancel = async (req, res, next) => {
//     const sId = req.params.sId;
//     const saId = req.params.saId;

//     let shift;
//     try {
//         shift = await Shift.findById(saId);
//     } catch (err) {
//         const error = new HttpError(
//             'An error occurred, the shift was not found',
//             500
//         );
//         return next(error);
//     };

//     let shiftById;
//     try {
//         shiftById = await Shift.findById(sId);
//     } catch (err) {
//         const error = new HttpError(
//             'An error occurred, the shift was not found',
//             500
//         );
//         return next(error);
//     };

//     try {
//         const sess = await mongoose.startSession();
//         sess.startTransaction();
//         await shiftById.save({ session: sess });
//         await sess.commitTransaction();
//     } catch (err) {
//         const error = new HttpError(
//             'The shift could not be deleted, please try again.',
//             500
//         );
//         return next(error);
//     };

//     res.status(201).json({ shift : shiftById });
// };

// const getCancellationByPatient = async (req, res, next) => {
//     const shiftById = req.params.pid;

//     let shift;
//     try {
//       shift = await Shift.findById(pid);
//     } catch (err) {
//       const error = new HttpError(
//         'Something went wrong, could not delete the shift.',
//         500
//       );
//       return next(error);
//     }
  
//     if (!shift) {
//       const error = new HttpError('Could not find the shift for this id.',
//         404);
//       return next(error);
//     }
  
//     try {
//       const sess = await mongoose.startSession();
//       sess.startTransaction();
//       await Shift.deleteOne({'_id': pid}, {sess})
//       await sess.commitTransaction();
//     } catch (err) {
//       const error = new HttpError(
//         'An error occurred, could not delete the shift.',
//         500
//       );
//       return next(error);
//     };
  
//     res.status(200).json({ message: 'Deleted shift.' });
// };

exports.createAvailableShift = createAvailableShift;
// exports.updateAvailableShift = updateAvailableShift;
// exports.deleteAvailableShift = deleteAvailableShift;
// exports.getShiftByDoctor = getShiftByDoctor;
// exports.getShiftByPatient = getShiftByPatient;
// exports.shiftReservation = shiftReservation;
// exports.shiftCancel = shiftCancel;
// exports.getCancellationByPatient = getCancellationByPatient;

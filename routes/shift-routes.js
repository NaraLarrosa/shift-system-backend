const express = require('express');
const shiftControllers = require('../controllers/shift-controllers');
const { check } = require('express-validator');
const authAdmin = require('../middleware/auth-admin');
const authPatient = require('../middleware/auth-patient');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', authAdmin,
    [
        check('day')
        .not()
        .isEmpty(),
        check('hour')
        .not()
        .isEmpty(),
        check('description')
        .isLength({ min: 5 }),
        check('available')
        .not()
        .isEmpty(),
        check('doctor')
        .not()
        .isEmpty(),
    ],
shiftControllers.createAvailableShift);

router.patch('/update/:sid', authAdmin,
    [
        check('day')
        .not()
        .isEmpty(),
        check('hour')
        .not()
        .isEmpty(),
        check('description').isLength({ min: 5 }),
        check('available')
        .not()
        .isEmpty(),
        check('doctor')
        .not()
        .isEmpty(),
    ],
shiftControllers.updateAvailableShift);

router.delete('/delete/:sid', authAdmin, shiftControllers.deleteAvailableShift);

router.get('/doc/:did', authAdmin, shiftControllers.getShiftByDoctor);

router.get('/pat/:pid', auth, shiftControllers.getShiftByPatient);

router.put('/reservation/:sid', authPatient, shiftControllers.shiftReservation);

router.put('/cancel/:sid', authPatient, shiftControllers.shiftCancel);

router.get('/history/cancel/:pid', auth, shiftControllers.getCancellationByPatient );

module.exports = router;
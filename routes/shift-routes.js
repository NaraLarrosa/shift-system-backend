const express = require('express');
const shiftControllers = require('../controllers/shift-controllers');
const { check } = require('express-validator');
const authAdmin = require('../middleware/auth-admin');
const authPatient = require('../middleware/auth-patient');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(authAdmin);

router.post('/create',
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
shiftControllers.createAvailableShift);

router.patch('/update/:sid',
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

router.delete('/delete/:sid', shiftControllers.deleteAvailableShift);

router.get('/doc/:did', shiftControllers.getShiftByDoctor);

router.use(auth);

router.get('/pat/:pid', shiftControllers.getShiftByPatient);

router.use(authPatient);

router.put('/reservation',
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
 shiftControllers.shiftReservation);

router.put('/cancel/:sid', shiftControllers.shiftCancel);

router.use(auth);

router.get('/istory/cancel/:pid', shiftControllers.getCancellationByPatient );

module.exports = router;
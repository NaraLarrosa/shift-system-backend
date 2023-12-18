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
        check('description').isLength({ min: 5 })
    ],
shiftControllers.createAvailableShift);

// router.patch('/update',
//     [
//         check('day')
//         .not()
//         .isEmpty(),
//         check('hour')
//         .not()
//         .isEmpty(),
//         check('description').isLength({ min: 5 })
//     ],
// shiftControllers.updateAvailableShift);

// router.delete('/delete', shiftControllers.deleteAvailableShift);

// router.get('/doc/:did', shiftControllers.getShiftByDoctor);

// router.use(auth);

// router.get('/:pid', shiftControllers.getShiftByPatient);

// router.use(authPatient);

// router.put('/reservation', shiftControllers.shiftReservation);

// router.put('/cancel', shiftControllers.shiftCancel);

// router.use(auth);

// router.get('/cancel/:pid', shiftControllers.getCancellationByPatient );

module.exports = router;
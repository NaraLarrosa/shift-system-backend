const express = require('express');
const shiftControllers = require('../controllers/shift-controllers');
const { check } = require('express-validator');

const router = express.Router();

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

router.patch('/update',
    [
        check('day')
        .not()
        .isEmpty(),
        check('hour')
        .not()
        .isEmpty(),
        check('description').isLength({ min: 5 })
    ],
shiftControllers.updateAvailableShift);

router.delete('/delete', shiftControllers.deleteAvailableShift);

router.get('/doc/:did', shiftControllers.shiftByDoctor);

router.get('/:pid', shiftControllers.shiftByPatient);

router.put('/reservation', shiftControllers.shiftReservation);

router.put('/cancel', shiftControllers.shiftCancel);

router.get('/cancel/:pid', shiftControllers.cancellatioByPatient );

module.exports = router;
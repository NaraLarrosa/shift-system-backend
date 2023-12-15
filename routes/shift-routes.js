const express = require('express');
const shiftControllers = require('../controllers/shift-controllers');
const { check } = require('express-validator');

const router = express.Router();

router.post('/create', shiftControllers.createAvailableShift);

router.patch('/update', userControllers.updateAvailableShift);

router.delete('/delete', userControllers.deleteAvailableShift);

router.get('/doc/:did', userControllers.shiftByDoctor);

router.get('/:pid', userControllers.shiftByPatient);

router.put('/reservation', userControllers.shiftReservation);

router.put('/cancel', userControllers.shiftCancel);

router.get('/cancel/:pid', userControllers.cancellatioByPatient );

module.exports = router;
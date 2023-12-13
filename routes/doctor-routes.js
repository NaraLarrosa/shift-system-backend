const express = require('express');
const doctorControllers = require('../controllers/doctor-controllers');
const { check } = require('express-validator');

const router = express.Router();

router.get('/doctors', doctorControllers.getAllDoctors);

router.get('/doctor/:did', 
    [
        check('')
    ],
doctorControllers.getDoctorById);

router.post('/doctor', 
    [
        check('')
    ],
doctorControllers.createDoctor);

router.use(checkAuth);

router.patch('/doctor/:did', 
    [
        check('')
    ],
doctorControllers.updateDoctorById);

module.exports = router;
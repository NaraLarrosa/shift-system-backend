const express = require('express');
const doctorControllers = require('../controllers/doctor-controllers');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/auth-admin');

const router = express.Router();

router.get('/', auth , doctorControllers.getAllDoctors);

router.get('/:did', auth , doctorControllers.getDoctorById);

router.post('/add', authAdmin ,
    [
        check('name')
        .not()
        .isEmpty(),
        check('surname')
        .not()
        .isEmpty(),
        check('dni')
        .not()
        .isEmpty(),
        check('specialty')
        .not()
        .isEmpty()
    ],
doctorControllers.addDoctor);

router.patch('/update/:did', authAdmin ,
    [
        check('name')
        .not()
        .isEmpty(),
        check('surname')
        .not()
        .isEmpty(),
        check('dni')
        .not()
        .isEmpty(),
        check('specialty')
        .not()
        .isEmpty()
    ],
doctorControllers.updateDoctor);

module.exports = router;
const express = require('express');
const doctorControllers = require('../controllers/doctor-controllers');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', doctorControllers.getAllDoctors);

router.get('/:did', doctorControllers.getDoctorById);

router.post('/add', 
    [
        check('specialty')
        .not()
        .isEmpty(),
        check('name')
        .not()
        .isEmpty(),
        check('surname')
        .not()
        .isEmpty()
    ],
doctorControllers.addDoctor);

router.use(auth);

router.patch('/update/:did', 
    [
        check('name')
        .not()
        .isEmpty(),
        check('surname')
        .not()
        .isEmpty(),
        check('specialty')
        .not()
        .isEmpty()
    ],
doctorControllers.updateDoctor);

module.exports = router;
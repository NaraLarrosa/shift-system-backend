const express = require('express');
const specialtyControllers = require('../controllers/specialty-controllers');
const { check } = require('express-validator');

const router = express.Router();

router.get('/specialties',
    [
        check('specialty')
        .not()
        .isEmpty()
    ],
specialtyControllers.getSpecialties);

module.exports = router;
const express = require('express');
const specialtyControllers = require('../controllers/specialty-controllers');
//const { check } = require('express-validator');

const router = express.Router();

router.get('/', specialtyControllers.getSpecialties);

module.exports = router;
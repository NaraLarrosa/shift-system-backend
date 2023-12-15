const express = require('express');
const specialtyControllers = require('../controllers/specialty-controllers');

const router = express.Router();

router.get('/', specialtyControllers.getSpecialties);

module.exports = router;
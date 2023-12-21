const express = require('express');
const specialtyControllers = require('../controllers/specialty-controllers');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/auth-admin');

const router = express.Router();

router.get('/', auth, specialtyControllers.getSpecialties);

router.post('/add', authAdmin,
[
    check('name')
    .not()
    .isEmpty()
],
specialtyControllers.addSpecialties);

module.exports = router;
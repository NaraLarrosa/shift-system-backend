const express = require('express');
const specialtyControllers = require('../controllers/specialty-controllers');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/auth-admin');

const router = express.Router();

router.use(auth);

router.get('/', specialtyControllers.getSpecialties);

router.use(authAdmin);

router.post('/add', 
[
    check('name')
    .not()
    .isEmpty()
],
specialtyControllers.addSpecialties);

module.exports = router;
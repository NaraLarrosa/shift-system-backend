const express = require('express');
const userControllers = require('../controllers/user-controllers');
const { check } = require('express-validator');

const router = express.Router();

router.post('/register',
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
        check('type')
        .not()
        .isEmpty(),
        check('email')
        .isEmail(),
        check('password').isLength({ min: 6 })
    ],
userControllers.registerUser);

router.post('/login', userControllers.loginUser);

router.post('/recover-password',
    [
        check('email')
        .isEmail()
    ],
userControllers.passwordRecovery);

router.patch('/reset-password/:token', userControllers.resetPassword);

module.exports = router;
const express = require('express');
const userControllers = require('../controllers/user-controllers');
const { check } = require('express-validator');

const router = express.Router();

router.post('/user/register',
    // [
    //     check('name')
    //     .not()
    //     .isEmpty(),
    //     check('surname')
    //     .not()
    //     .isEmpty(),
    //     check('email')
    //     .normalizeEmail()
    //     .isEmail(),
    //     check('password').isLength({ min: 6 }),
    //     check('type')
    //     .not()
    //     .isEmpty()
    // ],
    userControllers.registerUser
);

// router.post('/user/login', userControllers.loginUser);

// router.post('/user/recover-password', userControllers.recoverPasswordUser);

module.exports = router;
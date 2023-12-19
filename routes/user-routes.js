const express = require('express');
const userControllers = require('../controllers/user-controllers');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

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

router.use(auth);

router.post('/login', userControllers.loginUser);

router.post('/recover-password/:uid',
    [
        check('email')
        .isEmail(),
        check('password').isLength({ min: 6 }),
    ],
userControllers.passwordRecovery);

module.exports = router;
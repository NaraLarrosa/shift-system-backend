const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const userControllers = require('../controllers/userControllers');
const router = new express.Router();

router.post('/user', userControllers.createUser);

router.post('/users/login', userControllers.loginUser);

router.post('/users/recover-password', userControllers.recoverPasswordUser);

module.exports = router;
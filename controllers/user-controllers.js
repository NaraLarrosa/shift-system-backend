const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const nodemailer = require("nodemailer");

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { name, surname, dni, type, email, password } = req.body;
  
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        'Signing up failed.',
        500
      );
      return next(error);
    }
  
    if (existingUser) {
      const error = new HttpError(
        'User already exists, please login instead.',
        422
      );
      return next(error);
    }
  
    const createdUser = new User({
      name,
      surname,
      dni,
      type,
      email,
      password
    });
  
    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    
    const token = await createdUser.generateAuthToken()
  
    res
      .status(201)
      .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
  
    let existingUser;
  
    try {
      existingUser = await User.findByCredentials(req.body.email, req.body.password)
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        403
      );
      return next(error);
    }
    
    const token = await existingUser.generateAuthToken()
  
    res.json({
      userId: existingUser.id,
      email: existingUser.email,
      token: token
    })
};

const passwordRecovery = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ userId: user._id }, 'resetKey', { expiresIn: '1h' });

    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000);
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_GMAIL
      },
    });

    const resetLink = `http://localhost:5000/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.USER_GMAIL,
      to: user.email,
      subject: 'Password recovery',
      text: `Click the link below to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'An email has been sent with instructions to reset your password' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  };

  const resetPassword = async (req, res, next) => {
    try {
      const resetToken = req.params.token;
  
      const decodedToken = jwt.verify(resetToken, 'resetKey');
      const userId = decodedToken.userId;
  
      const user = await User.findOne({ _id: userId, resetToken });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const newPassword = req.body.newPassword;
  
      user.password = newPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    };
  };
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.passwordRecovery = passwordRecovery;
exports.resetPassword = resetPassword;

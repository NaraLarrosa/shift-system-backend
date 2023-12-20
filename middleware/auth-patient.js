const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authPatient = async (req, res, next) => {
    const jwtToken = process.env.JWT_SECRET;
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtToken);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        if(decoded.type !== "patient") {
            throw new Error("Only allowed for 'patient' users.");
        }

        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate with patient.' });
    }
};

module.exports = authPatient;
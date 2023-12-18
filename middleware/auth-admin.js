const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        };

        if(decoded.type !== "admin") {
            throw new Error("Only allowed for 'admin' users.");
        };

        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate with admin.' });
    };
};

module.exports = authAdmin;
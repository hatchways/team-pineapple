const express = require('express');
const router = express.Router();

const UserValidation = require('./validate/user');
const User = require('../models/user');

router.post('/register', [UserValidation.register, async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user, token: user.loginToken() });
    } catch (err) {
        res.status(400).json({ success: false, message: err.errmsg });
    }
}]);

module.exports = router;
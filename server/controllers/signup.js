const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const { join } = require('path');
const { addUser } = require('../database/queries/addUser');
const { signupSchema } = require('./ValidationSchemas');

exports.renderSignup = (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
};

exports.postSignup = (req, res) => {
    Joi.validate(req.body, signupSchema, (err, result) => {
        const { email } = result;
        if (err) {
            res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'), { error: err });
        } else {
            bcrypt.genSalt(5)
                .then(salt => bcrypt.hash(result.password, salt))
                .then(hash => addUser({ email, hash }))
                .then(() => res.redirect('/cities'))
                .catch(err => res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'), { error: err }));
        }

    })
};
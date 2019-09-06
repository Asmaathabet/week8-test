const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { join } = require('path');
const { addUser } = require('../database/queries/addUser');
const { signupSchema } = require('./ValidationSchemas');

require('env2')('./config.env');
const SecretKey = process.env.SECRET_KEY;

exports.renderSignup = (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
};

exports.postSignup = (req, res, next) => {
    Joi.validate(req.body, signupSchema, (err, result) => {
        const { email } = result;
        if (err) {
            res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'), { error: err });
        } else {
            bcrypt.genSalt(5)
                .then(salt => bcrypt.hash(result.password, salt))
                .then(hash => addUser({ email, hash }))
                .then(result => {
                    const accessToken = jwt.sign({ id: result.id }, SecretKey);
                    res.cookie("access", accessToken);
                    res.redirect("/cities");
                })
                .catch(err => next(err));

        }


    })
}
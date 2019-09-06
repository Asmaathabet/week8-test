const { join } = require('path');
const Joi = require('@hapi/joi');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { getUser } = require('../database/queries/getUser');
const { loginSchema } = require('./ValidationSchemas');

require('env2')('./config.env');
const SecretKey = process.env.SECRET_KEY;

exports.renderLogin = (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
};

exports.postLogin = (req, res, next) => {
    Joi.validate(req.body, loginSchema, (err, value) => {
        if (err) {
            res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'), { error: err });
        } else {
            getUser(value)
                .then(result => {
                    bcrypt.compare(value.password, (result.rows[0].password), (err, isVaild) => {

                        if (isVaild) {
                            const accessToken = jwt.sign({ id: result.rows[0].id }, SecretKey);
                            res.cookie('access', accessToken);
                            res.redirect('/cities');
                        } else {
                            res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'), { error: 'Password or email is wrong' });
                        }
                    });
                })
                .catch(err => next(err));

        }

    });
}
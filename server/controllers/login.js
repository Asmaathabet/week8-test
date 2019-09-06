const { join } = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { getUser } = require('../database/queries/getUser');
const { loginSchema } = require('./ValidationSchemas');

require('env2')('./config.env');


exports.renderLogin = (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
};

exports.postLogin = (req, res, next) => {


}
const { join } = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('env2')('./config.env');


exports.renderLogin = (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
};

exports.postLogin = (req, res, next) => {

}
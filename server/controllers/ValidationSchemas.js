const joi = require('@hapi/joi');

exports.signupSchema = joi.object().keys({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().regex(/[a-zA-Z0-9]/).min(3).max(30).required(),
    confirm_password: joi.string().vaild(joi.ref('password')).required(),
});
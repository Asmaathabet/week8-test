const jwt = require('jsonwebtoken');
require('env2')('./config.env');

const secret = process.env.SECRET_KEY;

exports.isLogin = (req, res, next) => {
    console.log(req);
    jwt.verify(req.cookies.access, secret, (err, result) => {
        if (err) {
            res.redirect('/');
        } else {
            req.access = result;
            next();
        }
    })
}
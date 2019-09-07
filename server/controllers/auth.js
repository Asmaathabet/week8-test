const jwt = require('jsonwebtoken');
require('env2')('./config.env');

const secret = process.env.SECRET_KEY;

exports.isLogin = (req, res, next) => {
    const { access } = req.cookies;
    if (access) {
        jwt.verify(req.cookies.access, secret, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                req.access = result;
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}
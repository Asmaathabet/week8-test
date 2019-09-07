const express = require('express');

const error = require('./error');
const city = require('./city');
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const auth = require('./auth');

const router = express.Router();

router.get('/login', login.renderLogin);
router.post('/login', login.postLogin);

router.get('/signup', signup.renderSignup);
router.post('/signup', signup.postSignup);

router.get('/logout', auth.isLogin, logout.logout);

//router.use(auth.isLogin);
router.get('/cities', auth.isLogin, city.renderCities);
router.get('/all-cities', auth.isLogin, city.getAllCities);
router.post('/add-city', auth.isLogin, city.add);

router.use(error.client);
router.use(error.server);

module.exports = router;
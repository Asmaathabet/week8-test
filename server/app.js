const express = require("express");
const { join } = require("path");
const router = require("./controllers");
const morganv = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "..", "public")));
app.use(morganv('dev'));
app.use(cookieParser());
app.set("port", process.env.PORT || 5000);

app.use(router);

module.exports = app;
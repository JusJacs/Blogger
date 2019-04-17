var dotenv = require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');
var app = express();

// view engine setup

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
    console.log(" PLEASE REGISTER OR SIGN IN ")
  }
});

module.exports = app;

// Global
global._ = require('underscore')
global.async = require('async')
global.config = require('./config/env/' + process.env.NODE_ENV)

// load environment variables from .env file
var dotenv = require('dotenv');
dotenv.load();

// Local
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./config/db');

var fs = require('fs');
var path = require('path');


// Routes
var index = require('./routes/index');
var signup = require('./routes/signup');






// APP CONFIG
global.appRoot = path.resolve(__dirname);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


var logger = require('./config/logger.js');
global.log = logger.log;
global.log.info('logger-up');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// set a cookie
app.use(function(req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.tracker;
    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('tracker', randomNumber);
        console.log('cookie created');
    } else {
        // yes: cookie was present 
        console.log('cookie exists: ', cookie);
    }
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
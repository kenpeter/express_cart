// express
var express = require('express');

// ath
var path = require('path');

// serve favicon
var favicon = require('serve-favicon');

// log
var logger = require('morgan');

// cookie parser
var cookieParser = require('cookie-parser');

// body parser
// json, etc
var bodyParser = require('body-parser');

// express handlebars
var expressHbs = require('express-handlebars');

// mongo db
var mongoose = require('mongoose');

// session
var session = require('express-session');

// passport for user management
var passport = require('passport');

// msg flash
var flash = require("connect-flash");


// An actual routing obj
var index = require('./routes/index');

// connect
mongoose.connect('localhost:27017/shopping');

// express app
var app = express();


// no need absolute path
// view engine setup
// ./views/error.hbs
// ./views/index.hbs
// ./views/partials/header.hbs
// ./views/layouts/layout.hbs
app.set('views', path.join(__dirname, 'views'));

// set view engine hbs
app.engine('.hbs', expressHbs({
	defaultLayout: 'layout',
	extname: '.hbs'
}));

// view engine
// need .hbs
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app use
// loger
// dev is the format
app.use(logger('dev'));

// app use
// body parser
// json
app.use(bodyParser.json());

// app use
// https://stackoverflow.com/questions/29175465/body-parser-extended-option-qs-vs-querystring
// extended: false use querystring lib, which simpler, supported by more browser
app.use(bodyParser.urlencoded({ extended: false }));

// app use
// cookie parser

app.use(cookieParser());

// app use
// session
// secret
// resave
// save uninitialized
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));


// flash above
// flash is func
app.use(flash());

// app
// .use
// passport
// initialized
app.use(passport.initialize());

// passport with session
app.use(passport.session());


// app use
// express.static
// path.join
// ./public
app.use(express.static(path.join(__dirname, 'public')));

// app use
// / root
// index is routes/index.js
// what index.js has is there is router
// inside router, there is res.render. Then template file index.hbs with vars
app.use('/', index);



// app.use(func(){})
// app.use(func(){})
// app.use
// func
// req, res, next
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err
  // new Err
  // not found
  // err
  // status
  // 404
  // next(err)
  // 
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// app.use
// func
// err, req, res, next
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // http://expressjs.com/en/api.html#res.locals
  // res.locals
  // message
  // res.locals.message ==
  // res.locals.error ==
  res.locals.message = err.message;
  
  // res.locals.message exists in res scope
  // res.locals.error
  // req.app.get()
  // env
  // development
  // err
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // res
  // status
  // err status
  // 500
  // res
  // render
  // error
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module
// exports
// app
module.exports = app;

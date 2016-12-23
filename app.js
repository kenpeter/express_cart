// express engine
var express = require('express');

// file path
var path = require('path');

// do fav icon
var favicon = require('serve-favicon');

// log msg
var logger = require('morgan');

// we need cookie and parse cookie
// app.use
var cookieParser = require('cookie-parser');

// body parser
// json, html etc
var bodyParser = require('body-parser');

// html template engine
var expressHbs = require('express-handlebars');

// database
var mongoose = require('mongoose');

// session for express
var session = require('express-session');

// passport for user sessino management
var passport = require('passport');

// flash some msg on the top
var flash = require("connect-flash");


// this like the controller class
// it has a few controller which links to view
var index = require('./routes/index');


// localhost, port and db
mongoose.connect('localhost:27017/shopping');

// express app
var app = express();

// NOTE: app.use is for middle ware
// no need absolute path
// app.set
// views, set the things we need, views dir
// path.join
// __dirname
// ./views, set the actual path
// ./views/error.hbs
// ./views/index.hbs
// ./views/partials/header.hbs
// ./views/layouts/layout.hbs
app.set('views', path.join(__dirname, 'views'));


// app
// .engine
// .hbs
// expressHbs == handle bar engine
// default layout, layout
// extention name == .hbs
app.engine('.hbs', expressHbs({
	defaultLayout: 'layout',
	extname: '.hbs'
}));


// app
// set
// view engine
// .hbs
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
// secret: secret
// resave: false, don't resave session
// save uninitialized, false, don't save session, if not init
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));


// app
// use
// flash()
// flash msg
app.use(flash());


// app
// .use
// passport
// initialized
// init session with express app
app.use(passport.initialize());

// app
// .use
// passport with session
app.use(passport.session());


// app use
// express.static, this how browser handle public visit
// path.join
// ./public
app.use(express.static(path.join(__dirname, 'public')));


// app.use
// that is the entry point
// index is the route, which is controller linking to views
app.use('/', index);



// app.use
// func
// req
// res
// next
app.use(function(req, res, next) {
  // var error
  // new error obj
  // not found
  // err
  // status
  // 404
  // next, move to next
  // next(err)
  // this guy uses next
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// app.use
// does it mean you can add err when you need to
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // http://expressjs.com/en/api.html#res.locals
  // res
  // locals
  // message
  // err
  // .message
  res.locals.message = err.message;
  
  // res.locals.message exists in res scope
  // res
  // locals
  // error
  // req.app.get, env
  // what is req.app
  // env === dev or error
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // so this guy use render
  // res status
  // err status
  // 500
  // res render
  res.status(err.status || 500);
  res.render('error');
});

// module
// exports
// app
module.exports = app;

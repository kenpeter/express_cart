var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require("passport");

var csurfProtect = csurf();
router.use(csurfProtect);


// NOTE: because in app.js
// we have app.use('/user', userRoute);
// router.get("/signup") is actually /user/signup
// when you do redirect still go for full path /user/signup
// 
// router
// get
// route: /user/signup
// func, req, res, next
// res
// .render
// the view user/signup
// csrf, csrf token
router.get("/signup", function(req, res, next){

  // we define req.flash('error', msg) in passport.js
  // error msg
  // req
  // flash
  // error
  var errorMsg = req.flash('error');

  // res
  // render
  // route user/signup
  // csrf protect
  // req
  // csrf token
  // error msg
  // error msg
  // has error
  // error msg length
  // >0 
  res.render("/signup", {csurfProtect: req.csrfToken(), errorMsg: errorMsg, hasError: errorMsg.length > 0});
});


// sign in page
router.get("/signin", function(req, res, next){
  var errorMsg = req.flash('error');

  res.render("user/signin", {csurfProtect: req.csrfToken(), errorMsg: errorMsg, hasError: errorMsg.length > 0});
});


// user profile
router.get("/profile", function(req, res, next){
  res.render("user/profile");
});



// router
// post
// /user/signup
// func, req, res, next
// res
// redirect
router.post("/signup", passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));


router.post("/signin", passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));


module.exports = router;

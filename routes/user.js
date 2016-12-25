var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require("passport");

var csurfProtect = csurf();
router.use(csurfProtect);

// user profile
router.get("/profile", isLoggedIn, function(req, res, next){
  res.render("user/profile");
});


// not login, then need to go to other place, cannot just
// go to home page evey time.
router.get("/", isNotLoggedIn, function(req, res, next){
  next();
});


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
  res.render("user/signup", {csurfProtect: req.csrfToken(), errorMsg: errorMsg, hasError: errorMsg.length > 0});
});


// sign in page
router.get("/signin", function(req, res, next){
  var errorMsg = req.flash('error');

  res.render("user/signin", {csurfProtect: req.csrfToken(), errorMsg: errorMsg, hasError: errorMsg.length > 0});
});


// logout
router.get("/logout", function(req, res, next){
  // from passport
  res.logout();
  res.redirect("/");
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


// func
// is log in
// req
// res
// next
function isLoggedIn(req, res, next) {
  // req
  // is authenticated
  if(req.isAuthenticated()) {
    // return
    // next
    // ()
    return next();
  }

  res.redirect("/");
}


function isNotLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}

module.exports = router;

var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require("passport");

var Order = require("../models/order");
var Cart = require("../models/cart");

var csurfProtect = csurf();
router.use(csurfProtect);

// user profile
router.get("/profile", isLoggedIn, function(req, res, next){
  // Order is user, cart, etc
  // find
  // req.user is from passport
  // remmeber Order is mongo,
  // {user: req.user} is looking for
  // func, err, orders
  Order.find({user: req.user}, function(err, orders){
    if(err) {
      // return
      // res
      // res.write????
      console.log("profile error");
      return res.write("error!");
    }
    
    var cart;
    // so basically, we modify the orders, adding extra items
    orders.forEach(function(order){
      // remember each order has a cart in mongo
      // order.cart is all items + total qty + total price
      // a single item is imagePath, desc, price + total qty of that kind + single price of that kind
      // Cart is similar to order's cart, except adding add and array gen method
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    
    res.render("user/profile", {orders: orders});
  });
  
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


// e.g. already login, but click logout link
// isLoggedIn goes to whatever next
// now req.logout
router.get("/logout", isLoggedIn, function(req, res, next){
  // from passport
  // req logout
  req.logout();
  
  // res
  // result
  // redirect
  res.redirect("/");
});


// router
// post
// /user/signup
// func, req, res, next
// res
// redirect
router.post("/signup", passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
}), function(req, res, next){
  if(req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }
  else {
    res.redirect("/user/profile");
  } 
});


// router
// post
// signin
// passport
// authenticate
// local.signin, which is policy
// fail then redirect, /user/signin
// fail then flash
router.post("/signin", passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
}), function(req, res, next) {
  // if req
  // session
  // old url
  if(req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }
  else {
    // e.g. if you are already logout
    // that means no req.session
    // has to back to /user/profile
    // default to user profile
    res.redirect("/user/profile");
  }
});


// func
// is log in
// req
// res
// next
function isLoggedIn(req, res, next) {
  // it is alread login, so go to whatever next
  if(req.isAuthenticated()) {
    // return
    // next
    // ()
    return next();
  }

  // not login, back to home page
  res.redirect("/");
}


function isNotLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}

module.exports = router;

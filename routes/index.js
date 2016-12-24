// express
var express = require('express');

// router
// express
// router
var router = express.Router();

// product
// model product.js
var Product = require('../models/product.js');


// csrf
var csurf = require('csurf');

// actually create csrf obj
var csurfProtect = csurf();

// passport
var passport = require("passport");

// as express router to use it
router.use(csurfProtect);


// router.get
// root path
// func, req, res, next
router.get('/', function(req, res, next) {
  
  // var products
  // Product monga
  // find
  // func, err, doc
  var products = Product.find(function(err, doc){
    // push 3 columns to each row
    var productRowTest = [];
    var productRow = [];
    var size = 3;
    
    /*
    //test
    console.log("gary");
    console.log(doc.length);
    */
    
    // doc slice
    // i: start
    // i+size: end
    for(var i=0; i<doc.length; i+=size) {
      /*
      var my_slice = doc.slice(0, size);
      console.log(my_slice);
      */
      
      var my_slice = doc.slice(i, i+size);
      productRow.push(my_slice);
      
      //test
      productRowTest.push({test: "yo"});
    }
  
    // res
    // render
    // shop
    // /index
    // pass data
    // title
    // prodctRow,
    // ....
    // it auto searches views dir
    res.render('shop/index', {
      title: 'Shopping cart',
      productRow: productRow,
      productRowTest: productRowTest
    });
    
  });
});


// router
// get
// route: /user/signup
// func, req, res, next
// res
// .render
// the view user/signup
// csrf, csrf token
router.get("/user/signup", function(req, res, next){

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


// user profile
router.get("/user/profile", function(req, res, next){
  res.render("user/profile");
});


// router
// post
// /user/signup
// func, req, res, next
// res
// redirect
router.post("/user/signup", passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));


// module
// exports
// router
module.exports = router;

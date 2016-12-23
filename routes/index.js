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
  res.render("user/signup", {csurfProtect: req.csrfToken()});
});


// router
// post
// /user/signup
// func, req, res, next
// res
// redirect
router.post("/user/signup", function(req, res, next){
  res.redirect("/");
});


// module
// exports
// router
module.exports = router;

// express
var express = require('express');

// router
// express
// router
var router = express.Router();

// product
// model product.js
var Product = require('../models/product');

//
var Cart = require("../models/cart");


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
// .get
// /add-to-cart
// :id
// func
// req
// res
// next
router.get("/add-to-cart/:id", function(req, res, next){
  // var
  // product id
  // req
  // params, from url
  // id
  var productId = req.params.id;
  
  // cart
  // new
  // Cart
  // req.session, request session
  // cart
  // ?
  // req.session.cart
  // or empty obj
  var cart = new Cart(
    // req
    // session
    // cart
    req.session.cart ? 
    req.session.cart : 
    {}
  );
  
  // Product, model
  // find by id
  // product id
  // func
  // err,
  // callback product
  Product.findById(productId, function(err, product){
    if(err) {
      // result, not request
      return res.redirect("/");
    }
    
    // cart add single
    // product
    // product.id
    cart.add(product, product.id);
    
    // in req,
    // in session
    // in cart
    // add cart
    req.session.cart = cart;
    
    console.log(req.session.cart);
    
    res.redirect("/");
  });
  
});


// module
// exports
// router
module.exports = router;

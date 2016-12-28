// express
var express = require('express');

// router
// express
// router
var router = express.Router();

// product
// model product.js
var Product = require('../models/product');

// cart
var Cart = require("../models/cart");

// Order
var Order = require("../models/order");

// router.get
// root path
// func, req, res, next
router.get('/', function(req, res, next) {
  // var success msg
  // req
  // flash
  // success
  // [0]
  var successMsg = req.flash('success')[0];
  
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
      productRowTest: productRowTest,
      successMsg: successMsg,
      noMessage: !successMsg
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
    
    // here we add cart to req.session.cart
    // in req,
    // in session
    // in cart
    // add cart
    req.session.cart = cart;
    
    //console.log(req.session.cart);
    
    res.redirect("/");
  });
  
});

// router
// get
// /shopping-cart
// func
// req, res, next
router.get("/shopping-cart", function(req, res, next){
  // if no cart
  // req
  // session
  // cart
  if(!req.session.cart) {
    // return
    // res
    // render
    // shop
    // shopping-cart
    // {}
    // products null
    return res.render("shop/shopping-cart", {products: null});
  }

  // var cart
  // new
  // Cart
  // req
  // session
  // cart
  var cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
  
});


// router
// get
// checkout
// func
// req, res, next
router.get("/checkout", isLoggedIn, function(req, res, next){
  // if
  // !req
  // .session
  // .cart
  if(!req.session.cart) {
    // return
    // res
    // .redirect
    // /shop
    return res.redirect("/shopping-cart");
  }

  var cart = new Cart(req.session.cart);
  var errMsg = req.flash("error")[0];
  
  res.render("shop/checkout", {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  });
  
});


// router
// post
// checkout post
// middle ware, is logged in, now /checkout becomes the req.sesson.oldUrl
router.post("/checkout", isLoggedIn, function(req, res, next){
  // no cart
  if(!req.session.cart) {
    // res redirect
    // 
    return res.redirect("/shopping-cart");
  }
  
  // cart obj
  var cart = new Cart(req.session.cart);
  
  // secret key
  var stripe = require("stripe")("sk_test_zVNSQ06wz3rTN2tK5DCwSgo5");
  
  var token = req.body.stripeToken;
  
  /*
  //test
  console.log("test");
  console.log(token);
  */
  
  // charge
  // stripe
  // charges
  // create
  var charge = stripe.charges.create({
    // amount
    amount: cart.totalPrice * 100, // Amount in cents
    // currency
    currency: "aud",
    source: token,
    description: "test"
  }, function(err, charge) {
    if (err) {
      // The card has been declined
      // req
      // flash
      // error
      // err
      // .msg
      req.flash("error", err.message);
      return res.redirect("/checkout");
    }
    
    if(err && err.type === 'StripeCardError') {
      req.flash("error", err.message);
      return res.redirect("/checkout");
    }
    
    var order = new Order({
      // user
      // req, coming from passport req.user
      user: req.user,
      // from above, from a session
      cart: cart,
      // address
      // the input field from req.body
      address: req.body.address,
      // 
      name: req.body.name,
      // charge.id is from stripe doc
      paymentId: charge.id
    });
    
    order.save(function(err, result){
      if(err) {
        console.log("---- error ----");
        console.log("order save error");
      }
    
      // req
      // flash
      // "success"
      req.flash("success", "Bought a product!");

      // req
      // session
      // cart, null    
      req.session.cart = null;
      
      // res
      // redirect
      res.redirect("/");
    });
    
    
    
  });
  
  
});


// it uses to protect checkout get and post
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  
  // here we actually created the req.session.oldUrl
  // req.url, what is this? req.url == /checkout, or any url previously
  req.session.oldUrl = req.url;
  
  res.redirect("/user/signin");
}

// module
// exports
// router
module.exports = router;

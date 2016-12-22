// another express
var express = require('express');

// express router
var router = express.Router();

var Product = require('../models/product.js');

//
var csurf = require('csurf');

var csurfProtect = csurf();

router.use(csurfProtect);


// router
// get
// /
// req, res, next
/* GET home page. */
router.get('/', function(req, res, next) {
  
  var products = Product.find(function(err, doc){
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
  
    // it auto searches views dir
    res.render('shop/index', {
      title: 'Shopping cart',
      productRow: productRow,
      productRowTest: productRowTest
    });
    
  });
});

router.get("/user/signup", function(req, res, next){
  res.render("user/signup", {csurfProtect: req.csrfToken()});
});


router.post("/user/signup", function(req, res, next){
  res.redirect("/");
});


// module
// exports
// router
module.exports = router;

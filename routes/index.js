// another express
var express = require('express');

// express router
var router = express.Router();

// router
// get
// /
// req, res, next
/* GET home page. */
router.get('/', function(req, res, next) {
  // res
  // render
  // index
  // pass title in json
  res.render('shop/index', {
    title: 'Shopping cart',
    testme_var: 'testme_var'
  });
});

// module
// exports
// router
module.exports = router;

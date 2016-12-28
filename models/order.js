// order has user (model, with colleciton), cart (model, no collection), address, name, payment id
// order has colleciton
// order
// mongoose
// require
// mongoose
var mongoose = require("mongoose");

// Schema
// mongoose
// .Schema
var Schema = mongoose.Schema;

// var schema
// new
// Schema
var schema = new Schema({
  //user
  // type
  // object id, why object id, because ref
  // ref User with email and password
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  
  // cart obj, the actual cart.js with methods
  // this doesn't have mongo collection
  cart: {type: Object, required: true},
  
  // address, string
  address: {type: String, required: true},
  
  // name, person name
  name: {type: String, required: true},
  
  // payment id, from strip
  paymentId: {type: String, required: true}
});

// module
// exports
// mongoose
// {order}
// schema
module.exports = mongoose.model("Order", schema);

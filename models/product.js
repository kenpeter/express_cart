var mongoose = require('mongoose');

// mongoose
// cap schema
var Schema = mongoose.Schema;

// create schema instance
// type String cap
var schema = new Schema({
  imagePath: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
});

// model export????
module.exports = mongoose.model("Product", schema);

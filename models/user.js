// mongo db
var mongoose = require("mongoose");

// empty schema
var Schema = mongoose.Schema;

// var
// bcrypt
// require
// bcrypt
// -nodejs
var bcrypt = require("bcrypt-nodejs");


// user schema
// new schema
// email, string, required
// password, string, required
var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
});

// userSchema
// methods
// encrypt pass
// func
// pass
// return
// bcrypt
// has sync
// pass
// bcrypt
// gen salt sync 5
// null
userSchema.methods.encryptPassword = function(password) {
  // if you look at the api
  // https://www.npmjs.com/package/bcrypt-nodejs
  // 
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};


// userSchema
// methods
// validate password
// func
// pass
// return
// bcrypt
// compare sync
// password
// this.pass
// this.pass, because inject to User, this has password and emails
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


// module exports (ssssssssssssss)
// mongoose
// User
// userSchema
module.exports = mongoose.model("User", userSchema);

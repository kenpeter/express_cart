// mongo db
var mongoose = require("mongoose");

// empty schema
var Schema = mongoose.Schema;

// user schema
// new schema
// email, string, required
// password, string, required
var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
});

// moudle export
// mongoose
// User
// userSchema
modules.export = mongoose("User", userSchema);

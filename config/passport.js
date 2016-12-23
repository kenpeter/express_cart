// not instance, just one obj
// passport
var passport = require("passport");

// user model, email and password
var User = require("../models/user.js");

// passport local
// strategy
var LocalStra = require("passport-local").Strategy;

// passport
// why we need to serialized user, because it has user detail
// passing via http(s)
// passport serialized user
// func, user, done
// done, null, user.id, is it that is why we have a id in passport.deserializedUser
passport.serializedUser(function(user, done){
  done(null, user.id);
});


// deserialized user, so we can use it in backend
// passport, deserializedUser, func, id, done
// User, find by id, id, callback func
// err, user
// done, err, user
passport.deserializedUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});


// password, use, middle ware
// .local, it means what?
// .signup, it means signup
// new
// localStra
// {}
// username field, pre-defined
// password field, ....
// pass request to callback
// that is why we have callback func
// func, req, email, password, can have more vars
passport.use("local.signup", new LocalStra({
  usernameField: 'email'
  passwordField: 'password',
  passReqtoCallback: true
}, function(req, email, password, done){
  // User, mongo
  // find one
  // use email to find
  // callback func, err, user, why user here, just a row
  User.findOne({'email': email}, function(err, user){
    // error
    // return
    // done
    // error
    if(err) {
      return done(err);
    }
    
    // user
    // return
    // passport done
    // null, false, what does false mean
    // {msg: ""}
    if(user) {
      return done(null, false, {message: 'email already there'});
    }
    
    // new user
    var newUser = new User();
    
    // assign email to user
    newUser.email = email;
    
    // assign passport to user
    newUser.password = password;  
  });

}));

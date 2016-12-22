// this is not intance, still refer to the same thing
var passport = require("passport");
var User = require("../models/user.js");
var LocalStra = require("passport-local").Strategy;

// passport
// seralized
// user
// func
// user
// done
// done
// null
// user.id
passport.serializedUser(function(user, done){
  done(null, user.id);
});

// passport
// de serialized user
// User, mongo
// find by id
// id, func
// done
// err
// user
passport.deserializedUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});


// passport
// .use
// local.signup
// new LocalStra
// usernameField, predefined
// passwordField, predefiend
// pass req to call back
passport.use("local.signup", new LocalStra({
  usernameField: 'email'
  passwordField: 'password',
  passReqtoCallback: true
}, function(req, email, password, done){
  User.findOne({'email': email}, function(err, user){
    if(err) {
      return done(err);
    }
    
    if(user) {
      return done(null, false, {message: 'email already there'});
    }
    
    var newUser = new User();
    newUser.email = email;
    newUser.password = password;  
  });

}));

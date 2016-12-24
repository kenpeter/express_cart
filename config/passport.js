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
passport.serializeUser(function(user, done){
  done(null, user.id);
});


// deserialized user, so we can use it in backend
// passport, deserializedUser, func, id, done
// User, find by id, id, callback func
// err, user
// done, err, user
passport.deserializeUser(function(id, done){
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
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // pass req to callback
}, function(req, email, password, done){

  /*
  // note, api has changed.
  console.log("==test==");
  console.log(email);
  console.log(password);
  console.log(done);
  */

  // Handle error, after submit
  // req
  // check body
  // email, the field
  // invalid email, which is the error msg
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});
  
  // multiple errors
  // req
  // validation
  // errors
  // ()
  var errors = req.validationErrors();
  
  // if error
  if(errors) {
    // err array
    var errMsg = [];
    // loop
    errors.forEach(function(err){
      // push error
      errMsg.push(err.msg);
    });
    
    // return
    // done
    // null
    // false
    // flash
    // error, key
    // error msg
    return done(null, false, req.flash('error', errMsg));
  }
  else {
  
  }

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
    
    // user already exist
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
    // newUser from above user instance
    newUser.password = newUser.encryptPassword(password);
    
    // new uesr instance
    // save
    // func
    // err, result
    newUser.save(function(err, result){
      // err
      // return
      // done
      // err
      if(err) {
        return done(err);
      }
      
      return done(null, newUser);
    });
  });

}));



// passport
// use
passport.use("local.signin", new LocalStra({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // pass req to callback
}, function(req, email, password, done){

  /*
  // note, api has changed.
  console.log("==test==");
  console.log(email);
  console.log(password);
  console.log(done);
  */

  // req
  // checkbody
  // email
  // invalid email
  // not empty
  // is email
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  
  // req
  // checkbody
  // password
  // invalid password
  // not empty
  req.checkBody('password', 'Invalid password').notEmpty();
  
  // errors
  // req
  // req validate errors
  var errors = req.validationErrors();
  
  // if error
  if(errors) {
    // err array
    var errMsg = [];
    // loop
    errors.forEach(function(err){
      // push error
      errMsg.push(err.msg);
    });
    
    // return
    // done
    // null
    // false
    // flash
    // error, key
    // error msg
    return done(null, false, req.flash('error', errMsg));
  }
  else {
  
  }

  // User, mongo
  // find one
  // use email to find
  // callback func, err, user, why user here, just a row
  User.findOne({'email': email}, function(err, user){
    if(err) {
      return done(err);
    }
    
    // no such user
    if(!user) {
      return done(null, false, {message: 'email already there'});
    }
    
    // validate password
    // null means what?
    // false means error
    if(!user.validatePassword(password)) { 
      return done(null, false, {message: 'password incorrect'});
    }  
   
    // all good
    // return user
    return done(null, user);
  });

}));

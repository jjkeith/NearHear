var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js')

//This puts the user in a cookie.
passport.serializeUser(function(user, done){
  done(null, user.id)
})

//This allows the app to read the cookie and know what user is there.
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user)
  })
})

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: 'true' // yes, we do want to have access to the req obj
}, function(req, email, password, done){
  console.log("inside of local signup");
// check to see if the email is taken
  User.findOne({'local.email': email}, function(err, user){

    if (err) return done(err)
    //the first argument in done is if it returns false
    if (user) return done(null, false, req.flash('signupMessage', 'That email is taken.'))
    var newUser = new User()
    newUser.local.name = req.body.name
    newUser.local.email = email
    newUser.local.password = newUser.generateHash(password)

    newUser.save(function(err){
      if (err) throw err
      return done(null, newUser, null)
    })
  })
}))

//This basically maps our stuff to what's built in to Passport
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  User.findOne({'local.email': email}, function(err, user){
    if (err) return done(err)
    if (!user) return done(null, false, req.flash('loginMessage', 'No user found...'))
    if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong password...'))

    return done(null, user)
  })
}))

module.exports = passport

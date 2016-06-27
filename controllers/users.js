var
  User = require('../models/User.js'),
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router()

//This will need to be edted
module.exports = {
  index: index,
  login: login,
  signup: signup
  // authenticate: authenticate
}


function index(req, res){
  res.render('login', {flash: req.flash('loginMessage')})
}

function signup(req, res){
  res.render('signup', {flash: req.flash('signupMessage')})}


// function authenticate() {
//   passport.authenticate('local-login', {
//   successRedirect: '/profile',
//   failureRedirect: '/login'
// })}

function login(req, res){
  res.render('login', {flash: req.flash('loginMessage')})
  }

// // function authenticate (passport.authenticate('local-login', {
//     successRedirect: '/profile',
//     failureRedirect: '/login'
//   }))

// userRouter.route('/signup')
//   .get(function(req, res){
//     res.render('signup', {flash: req.flash('signupMessage')})
//   })
//   .post(passport.authenticate('local-signup',{
//     successRedirect: '/profile',
//     failureRedirect: '/signup'
//   }))

// When somebody tries to go to the profile page, use isLoggedIn to check.
// The function has to be run before the route is processed.
// userRouter.get('/profile', isLoggedIn, function(req, res){
    //render the user's profile view (only if they're logged in...)
    // res.render('profile', {user: req.user})
// })

// userRouter.get('logout', function(req, res){
  //destroy the session and redirect the user back to the root.
  // req.logout()
//   res.redirect('/')
// })

// If it returns false, it throws back to the index.
// function isLoggedIn(req, res, next) {
//   if(req.isAuthenticated()) return next()
//   res.redirect('/')
// }

module.exports = userRouter

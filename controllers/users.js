var
  User = require('../models/User.js'),
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router()

//This will need to be edted
module.exports = {

  index: index,

  login: login,
  authenticate: authenticate,

  signup: signup,
  createAccount: createAccount,

  show: show,
  // user/:id/patch
  // user/:id/delete

  editForm: editForm,

  logout: logout
}


// Root Routes
function index(req, res) {
  res.render('login', {flash: req.flash('loginMessage')})
}


// Login Routes
function login(req, res) {
  res.render('login', {flash: req.flash('loginMessage')})
  }

function authenticate() {
  passport.authenticate('local-login', {
    successRedirect: '/user',
    failureRedirect: '/login'
  })
}


// Signup Routes
function signup (req, res){
    res.render('signup', {flash: req.flash('signupMessage')} )
  }

function createAccount(req, res) {
  passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup'
  })
}


// user/:id Routes
function show () {
  isLoggedIn(req, res);
  res.render( 'profile', {user: req.user} );
}

function edit() {}
//need to look at passport documentation to figure out if there's special syntax needed for this.

function destroy() {}
//need to look at passport documentation to figure out if there's special syntax needed for this.


// user/:id/edit Route
function editForm () {
  res.render('login');
}


// Logout Routes
function logout () {
  req.logout();
  res.redirect('/');
}


// Middleware for monitoring loginMessage
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

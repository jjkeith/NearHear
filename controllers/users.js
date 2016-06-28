// var
//   User = require('../models/User.js'),
//   express = require('express'),
//   passport = require('passport'),
//   passportConfig = require('../config/passport.js')
  //,userRouter = express.Router()
//
// //This will need to be edted
// module.exports = {
//   index: index,
//   login: login,
  // authenticate: authenticate
//
//   signup: signup,
//   // createAccount: createAccount
//   //
//   show: show,
//   // // user/:id/patch
//   // // user/:id/delete
//
//   editForm: editForm,
//
//   // logout: logout
// }
//
//
// // Root Routes
// function index(req, res) {
//   res.render('login', {flash: req.flash('loginMessage')})
// }
//
//
// // Login Routes
// function login(req, res) {
//   res.render('login', {flash: req.flash('loginMessage')})
//   }
//
// function authenticate(req, res) {
//   return passport.authenticate('local-login', {
//    successRedirect: '/user',
//    failureRedirect: '/',
//    failureFlash: true
//
//   })
// }
//
//
// // Signup Routes
// function signup (req, res){
//     res.render('signup', {flash: req.flash('signupMessage')} )
//   }
//
// // function createAccount(req, res) {
// //   console.log("inside of create account");
// //   passport.authenticate('local-signup',{
// //     successRedirect: '/',
// //     failureRedirect: '/signup'
// //   })
// // }
//
//
// // user/:id Routes
// function show () {
//   isLoggedIn(req, res);
//   res.render( 'user', {user: req.user} );
// }
//
// function edit() {}
// //need to look at passport documentation to figure out if there's special syntax needed for this.
//
// function destroy() {}
// //need to look at passport documentation to figure out if there's special syntax needed for this.
//
//
// // user/:id/edit Route
// function editForm () {
//   res.render('edit');
// }
//
//
// // Logout Routes
// // function logout (req, res) {
// //   req.logout();
// //   res.redirect('/');
// // }
//
//
// // Middleware for monitoring loginMessage
// function isLoggedIn(req, res, next) {
//   if(req.isAuthenticated()) return next()
//   res.redirect('/')
// }

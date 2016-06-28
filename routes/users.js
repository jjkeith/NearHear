  var
    express = require('express'),
    passport = require('passport'),
    userRouter = express.Router()
    // Post = require('../models/User.js'),
    // userCtrl = require('../controllers/users.js')

    userRouter.route('/login')
      .get(function(req, res){
        res.render('login', {flash: req.flash('loginMessage')})
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/user',
        failureRedirect: '/',
        failureFlash: true }
      ))


    userRouter.route('/signup')
      .get(function(req, res){
        res.render('signup', {flash: req.flash('signupMessage')})
      })
      .post(passport.authenticate('local-signup',{
        successRedirect: '/user',
        failureRedirect: '/signup'
      }))


    userRouter.get('/user', isLoggedIn, function(req, res){
        res.render('user', {user: req.user});

    })

    userRouter.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    })

    function isLoggedIn(req, res, next) {
      console.log("isLoggedIn")
      if(req.isAuthenticated()) return next()
      res.redirect('/')
    }

    module.exports = userRouter


// userRouter.route('/')
//   .get(userCtrl.index)
//
// userRouter.route('/login')
//   .get(userCtrl.login)
//   // .post(userCtrl.authenticate)
//
// userRouter.route('/signup')
//   .get(userCtrl.signup)
//   // .post(userCtrl.createAccount)
//
// userRouter.route('/user/:id')
//   .get(userCtrl.show)
//   // .patch(userCtrl.edit)
//   // .delete(userCtrl.destroy)
//
// userRouter.route('/user/:id/edit')
//   .get(userCtrl.editForm)
//
// userRouter.route('logout')
//   // .get(userCtrl.logout)

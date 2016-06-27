var
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  Post = require('../models/User.js'),
  userCtrl = require('../controllers/users.js')


// userRouter.route('/')
//   .get(userCtrl.index)
//   .post(userCtrl.signup)
  // to be added soon:
  // .patch(userCtrl.edit)
  // .delete(userCtrl.destroy)

//
// userRouter.route('/login')
//   .get(userCtrl.login)
//   .post(userCtrl.authenticate)
//
// userRouter.route('/signup')
    // .get(userCtrl.signup)
//
// userRouter.route('/user/:id')
//
// userRouter.route('/user/:id/edit')



userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {flash: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }))

userRouter.route('/signup')
  .get(function(req, res){
    res.render('signup', {flash: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))

// When somebody tries to go to the profile page, use isLoggedIn to check.
// The function has to be run before the route is processed.
userRouter.get('/profile', isLoggedIn, function(req, res){
    //render the user's profile view (only if they're logged in...)
    res.render('profile', {user: req.user})
})

userRouter.get('logout', function(req, res){
  //destroy the session and redirect the user back to the root.
  //the logout method is included in the cookie, so the method is available whenever the user is logged in.
  req.logout()
  res.redirect('/')
})

// We are writing our own middleware here.
// We can run isLoggedIn before any of the roots are processed.
// If it returns false, it throws back to the index.
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter

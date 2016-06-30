var
   express = require('express'),
   passport = require('passport'),
   userRouter = express.Router(),
   User = require('../models/User.js'),
   dotenv = require('dotenv').load({silent: true}),
   userCtrl = require('../controllers/users.js'),
   map_browser_key = process.env.MAP_BROWSER_KEY


// root route
userRouter.route('/')
  .get(function(req, res) {
    res.render('index')
  })

// Sign Up Routse
userRouter.route('/signup')
  .get(function(req, res){
    res.render('signup', {flash: req.flash('signupMessage')} )
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))

// Login Routes
userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {flash: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  } ))

// Redirect to the Edit Form
userRouter.get('/edit', isLoggedIn, function(req, res) {
  res.redirect('/users/' + req.user._id + '/edit');
})

// Render the Edit Form
userRouter.route('/users/:id/edit')
  .get(isLoggedIn, function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      if (err) throw err;
      res.render('edit', {user: user} )
    })
  })

// Redirect to the profile
userRouter.get('/profile', isLoggedIn, function(req, res) {
  res.redirect('/users/' + req.user._id);
})

// Render the profile page, delete and patch users
userRouter.route('/users/:id')
  .get(isLoggedIn, function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      if (err) throw err;
        res.render('users', {user: user, map_browser_key: map_browser_key});
    })
  })
  .patch(function (req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      if (err) throw err;
      // console.log("PW: ", req.body.password);
      if(req.body.username) user.local.username = req.body.username
      if(req.body.email) user.local.email = req.body.email
      if(req.body.username) user.local.username = req.body.username
      if (req.body.password) {
        user.local.password = user.generateHash(req.body.password)
      }
      user.save(function(err, user) {
        if(err) return console.log(err)
        res.redirect('/profile');
      })
    })
  })
  .delete(function (req, res) {
    User.findOneAndRemove({_id: req.params.id}, {local: req.body}, function(err, user){
      if(err){
        throw err;
        res.json( {success:false, message:"Your account could not be deleted"} );
      } else {
        res.json( {success:"", message: "Hope to see you back soon."} );
        res.redirect('/', {user: user} );
      }
    })
  })

// Run the logout function
userRouter.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

userRouter.get('/events/:id', function(req, res) {
  console.log('req.params.id',req.params.id);
  var event = req.params.id
    if (err) throw err;
    res.json(event)
})

// Checks if a user is logged in
function isLoggedIn(req, res, next) {
  console.log("isLoggedIn")
  if(req.isAuthenticated() ) return next();
    res.redirect('/');
}

module.exports = userRouter


// userRouter.get('/users', isLoggedIn, function(req, res){
//   res.render('user', {user: req.user, map_browser_key: map_browser_key, NodeGeocoder: NodeGeocoder});
// })

//************Even if the below never gets uncommented, it will be useful for putting routes in our Readme. ************//

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
// userRouter.route('/users/:id')
//   .get(userCtrl.show)
//   // .patch(userCtrl.edit)
//   // .delete(userCtrl.destroy)
//
// userRouter.route('/users/:id/edit')
//   .get(userCtrl.editForm)
//
// userRouter.route('logout')
//   // .get(userCtrl.logout)

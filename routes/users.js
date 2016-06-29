var
   express = require('express'),
   passport = require('passport'),
   userRouter = express.Router(),
   User = require('../models/User.js'),
   dotenv = require('dotenv').load({silent: true}),
   userCtrl = require('../controllers/users.js'),
   map_browser_key = process.env.MAP_BROWSER_KEY,
   app = express(),
   http = require('http').Server(app),
 	 io = require('socket.io')(http)

userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {flash: req.flash('loginMessage')})
  })
  // .post(userCtrl.authenticate())
  .post(passport.authenticate('local-login', {
     successRedirect: '/profile',
     failureRedirect: '/',
     failureFlash: true
  }))

userRouter.route('/users/:id/edit')
  .get(function(req, res) {
    User.findOne({_id: req.params._id}, function(err, user) {
      console.log(req.params.id);
      if (err) throw err;
      res.render('edit', {user: user} )
    })
  })

userRouter.route('/signup')
  .get(function(req, res){
    res.render('signup', {flash: req.flash('signupMessage')} )
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))

userRouter.get('/profile', isLoggedIn, function(req, res) {
  res.redirect('/users/' + req.user._id);
})

userRouter.get('/edit', isLoggedIn, function(req, res) {
  res.redirect('/users/' + req.user._id + '/edit');
})

userRouter.route('/about')
  .get(function(req, res) {
    res.render('about')
  })




userRouter.route('/users/:id')
  .get(isLoggedIn, function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      if (err) throw err;
      socket.emit('send-search', user.zipcode)
      socket.on('search-coords', function(search){
        var startingFocusCoords = [search[0].latitude, search[0].longitude]
        res.render('users', {user: user, map_browser_key: map_browser_key}, startingFocusCoords);
      })
    })
  })

  .delete(function (req, res) {
    User.findOneAndRemove({_id: req.params.id}, {local: req.body}, function(err, user){
      if(err){
        throw err;
        res.json({success:false, message:"Your account could not be deleted"})
      }else{
        res.json({success:"", message: "Hope to see you back soon."});
        res.redirect('/', {user: user} );
      }
    })
  })
  .patch(function (req, res) {
    console.log("Trying to update user...")
    User.findOneAndUpdate( {_id: req.params.id}, {local: req.body}, {new:true}, function(err, user) {
      if (err) throw err;
      res.json( {success: true, user: user} )
      // user.local.password = user.generateHash(password)
      res.render('/users')
      })
    })

// userRouter.get('/users', isLoggedIn, function(req, res){
//   res.render('user', {user: req.user, map_browser_key: map_browser_key, NodeGeocoder: NodeGeocoder});
// })

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

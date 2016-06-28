var
   express = require('express'),
   passport = require('passport'),
   userRouter = express.Router()
   User = require('../models/User.js'),
   dotenv = require('dotenv').load({silent: true})
   // userCtrl = require('../controllers/users.js')

 var map_browser_key = process.env.MAP_BROWSER_KEY;

userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {flash: req.flash('loginMessage')})
})
  .post(passport.authenticate('local-login', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true }
))

userRouter.route('/user/:id/edit')
  .get(function(req, res) {
    User.findOne({id: req.params.id}).exec(function(err, user){
    if (err) throw err;
    res.render('edit', {user: user})
    })
  })

userRouter.route('/signup')
  .get(function(req, res){
    res.render('signup', {flash: req.flash('signupMessage')} )
  })
  .post(passport.authenticate('local-signup',{
    successRedirect: '/user',
    failureRedirect: '/signup'
  }))

// userRouter.route('/user/:id')
//   .get(function(req, res) {
//     User.findOne({_id: req.params.id}.exec(function(err, user) {
//     if (err) throw err;
//     res.render('user', {user: user} );
//     )}
//   })
  userRouter.get('/user', isLoggedIn, function(req, res) {
    console.log("RENDERED PROFILE")
    User.findOne({_id: req.user._id})
      .exec(function(err, user){
        res.render('user.ejs', {user : user} );
      })
  })

userRouter.route('/user/:id')
  .delete(function (req, res) {
    User.findOneAndRemove({_id: req.params.id}, function(err){
      if(err){
        throw err;
        res.json({success:false, message:"Your account could not be deleted"})
      }else{
        res.json({success:"", message: "Hope to see you back soon."});
        res.redirect('/', {user: user});
      }
    })
  })
  .patch(function (req, res) {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, function(err, user) {
      if (err) throw err;
      res.json( {success:"Profile updated.", user: user} )
      res.render('/user/:id')
      })
    })

userRouter.get('/user', isLoggedIn, function(req, res){
  res.render('user', {user: req.user, map_browser_key: map_browser_key, NodeGeocoder: NodeGeocoder});
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

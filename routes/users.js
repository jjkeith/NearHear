var
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  Post = require('../models/User.js'),
  userCtrl = require('../controllers/users.js')


userRouter.route('/')
  .get(userCtrl.index)

userRouter.route('/login')
  .get(userCtrl.login)
  .post(userCtrl.authenticate)

userRouter.route('/signup')
  .get(userCtrl.signup)
  .post(userCtrl.createAccount)

userRouter.route('/user/:id')
  .get(userCtrl.show)
  // .patch(userCtrl.edit)
  // .delete(userCtrl.destroy)


userRouter.route('/user/:id/edit')
  .get(userCtrl.editForm)

userRouter.route('logout')
  .get(userCtrl.logout)


module.exports = userRouter
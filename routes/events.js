var
  express = require('express'),
  passport = require('passport'),
  eventRouter = express.Router(),
  Post = require('../models/Event.js'),
  eventCtrl = require('../controllers/events.js')



eventRouter.route('/events')
  .get(eventCtrl.index)

eventRouter.route('event/:id')
  .get(eventCtrl.show)

module.exports = eventRouter

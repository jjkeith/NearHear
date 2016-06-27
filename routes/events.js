var
  express = require('express'),
  passport = require('passport'),
  eventRouter = express.Router(),
  Post = require('../models/Event.js'),
  eventCtrl = require('../controllers/events.js')



eventRouter.route('/events')
  .get(eventRouter.index)

eventRouter.route('event/:id')
  .get(eventRouter.show)


module.exports = eventRouter

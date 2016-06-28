var
  express = require('express'),
  passport = require('passport'),
  eventRouter = express.Router(),
  Event = require('../models/Event.js'),
  eventCtrl = require('../controllers/events.js')


// in Server.js, an '/events' prefix is established.
eventRouter.route('/')
  .get(eventCtrl.index)

eventRouter.route('/:id')
  .get(eventCtrl.show)

module.exports = eventRouter

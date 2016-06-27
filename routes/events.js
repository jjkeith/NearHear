var
  express = require('express'),
  eventRouter = express.Router(),
  Event = require('../models/Event.js')

eventRouter.route('/events')
  .get(function(req, res) {
    Event.find({}, function(err, events) {
      if (err) throw err;
      res.json(events)
    })
  })

  eventRouter.route('/events/:id')
  .get(function(req, res) {
    Event.findById(req.params.id, function(err, event) {
      if (err) throw err;
      res.json(event)
    })
  })

var
  express = require('express'),
  passport = require('passport'),
  eventRouter = express.Router(),
  Event = require('../models/Event.js'),
  eventCtrl = require('../controllers/events.js')

eventRouter.get('/events/:id', function(req, res) {
  console.log('req.params.id',req.params.id);
  var event = req.params.id
    if (err) throw err;
    res.json(event)
})



module.exports = eventRouter

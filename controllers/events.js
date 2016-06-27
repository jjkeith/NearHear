var
  User = require('../models/Event.js'),
  express = require('express'),
  passport = require('passport'),
  eventRouter = express.Router()

module.exports = {

  index: index,
  show: show
}

function index (req, res) {
  Event.find({}, function(err, events) {
    if (err) throw err;
    res.json(events)
  })
}


function show (req, res) {
  Event.findById(req.params.id, function(err, event) {
    if (err) throw err;
    res.json(event)
  })
}

// variables for Routing
var
  User = require('../models/Event.js'),
  express = require('express'),
  passport = require('passport'),
  eventRouter = express.Router()

module.exports = {
  searchResults: searchResults,
  show: show
}

// Ultimately, isn't this view /users?  -jj
function searchResults(req, res){
  var apiUrl = 'http://api.bandsintown.com/events/search?&location=' + req.params.search.lat + req.params.search.lon '&radius=' +req.params.search.radius +'format=json&app_id=WDISM23';
  console.log(req.params.search);
  request(apiUrl, function(err, response){
    if (err) throw err;
    res.json(events)
    res.render('events', {events: events})
  })
})

function show (req, res) {
  Event.findById(req.params.id, function(err, event) {
    if (err) throw err;
    res.json(event)
  })
}

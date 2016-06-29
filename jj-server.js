app.get('/events/:search', function(req, res){
  var apiUrl = 'http://api.bandsintown.com/events/search?&location=' + req.params.search.lat + req.params.search.lon '&radius=' +req.params.search.radius +'format=json&app_id=WDISM23';
  console.log(req.params.search);
  request(apiUrl, function(err, response){
    if (err) throw err;

    var events = JSON.parse(response.body)
    events[0].datetime
    // res.send('<li>'+ datetime + '</li>')
    res.json(events)
    res.render('whateverview', {events: datetime})



  })
})

TO DO:

 -- change root for events router to '/'

bandsintown = require('bandsintown')(WDISM23),
gulp = require('gulp'),

app.use(morgan(':date[iso]')) // returns date in same format as BiT

formula for URLs
"http://api.bandsintown.com/events/search?&location=" + [lat],[lon] + "&radius=" + [radius] + "format=json&app_id=WDISM23"

example: http://api.bandsintown.com/events/search?&location=34.013055,%20-118.495347&radius=10&format=json&app_id=YOUR_APP_ID


// Base for including BiT info
bandsintown
.getArtistEventList('')
.then(function(events) {
  // return array of events
});

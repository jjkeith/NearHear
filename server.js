var
	express = require('express'),
	app = express(),
	ejs = require('ejs'),
	ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	favicon = require('serve-favicon'),

	passport = require('passport'),
	passportConfig = require('./config/passport.js'),

	userRoutes = require('./routes/users.js'),
	// eventRoutes = require('./routes/events.js'),

	request = require('request'),
	dotenv = require('dotenv').load({silent: true}),
	http = require('http').Server(app),
	io = require('socket.io')(http),

	NodeGeocoder = require('node-geocoder'),

	bandsintown = require('bandsintown')('WDISM23')


mongoose.connect(process.env.DB_URL, function(err){
	if (err) throw err;
	console.log('connected to mongodb (passport-authentication)');
})


var map_browser_key = process.env.MAP_BROWSER_KEY;
// io socket connection listener
io.on('connection', function(socket){
  console.log('a user connected');
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });

socket.on('send chat', function(msg){
	// if (err) return console.log(err)
	io.emit('r chat', msg)
	console.log(msg);
})
})

// socket.on('send-search', function(search) {
// 	console.log('in server.js, socket.on callbackfunction:', search);
	//
	// var apiUrl = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC"; -----uncomment this line

// 	});
// });
// });

// Application-wide middleware:
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use(express.static('public'))

// Environment port
var port = process.env.PORT || 3000

// EJS configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// Session + passport middleware
app.use(session({
	cookie: {_expires:60000000},//about 16 hours
	secret: "catsaresupercute",
	resave: true, //resets the cookie expiration whenever the user saves a page
	saveUninitialized: false //because passport will do it for us.
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash() );
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(function(req,res,next){
	res.locals.currentUser = req.user
  res.locals.isLoggedIn = !!req.user
  next()
})

// Establish rppt route
app.use('/', userRoutes)

app.get('/event', function(req, res){
	var apiUrl = 'http://api.bandsintown.com/events/search?&id=' + req.body.data +  'format=json&app_id=WDISM23'
	console.log(apiUrl);
	console.log(res);
	res.render('event.ejs')
})
// move this to events router when it's ready:
app.get('/search', function(req, res) {
	console.log("req.query.query");
	console.log(req.query.query);
	var apiUrl = 'http://api.bandsintown.com/events/search?&location=' + req.query.query +  '&radius=10format=json&app_id=WDISM23'
	request(apiUrl, function(err, response){
		console.log(apiUrl);
    if (err) throw err;
    var events = JSON.parse(response.body)
		res.json({message: "Stuff coming back from server...", events: events})
	})
})

app.post('/geocode', function(req, res){
	var address = req.body.data
	// console.log('GEOOOOCODEEE:', address);
	var options = {
		provider: 'google',
		httpAdapter: 'https',
		apiKey: map_browser_key,
		formatter: null         // 'gpx', 'string', ...
	};
	var geocoder = NodeGeocoder(options);
	// console.log('var geocoder set to:', geocoder);
	geocoder.geocode(address, function(err, geo) {
	if(err) return console.log(err);
  res.json({latitude: geo[0].latitude, longitude: geo[0].longitude})
});

// 	geocoder.geocode(req.data.body, function(err, res) {
// 		if(err) return console.log(err);
// 		console.log('RESPONSE:', res);
// })
})

http.listen(port, function(){
	console.log("Server running on port 3000")
})

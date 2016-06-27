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
	session = require('express-session'), //creates the cookies that passport uses
	passport = require('passport'),
	userRoutes = require('./routes/users.js'),
	passportConfig = require('./config/passport.js'),
	request = require('request'),
	dotenv = require('dotenv').load({silent: true})

	mongoose.connect(process.env.DB_URL, function(err){
		if (err) throw err;
		console.log('connected to mongodb (passport-authentication)');
	})

// application-wide middleware:
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// environment port
var port = process.env.PORT || 3000

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// session + passport middleware
app.use(session({
	cookie: {_expires:60000000},//about 16 hours
	secret: "catsaresupercute",
	resave: true, //resets the cookie expiration whenever the user saves a page
	saveUninitialized: false //because passport will do it for us.
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//root route
app.get('/', function(req,res){
	res.render('index')
})

app.use('/', userRoutes)

app.listen(port, function(){
	console.log("Server running on port", port)
})

var express = require('express'),

	path = require('path'),
	util = require('util'),

	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),

	methodOverride = require('method-override'),
	compression = require('compression'),

	favicon = require('serve-favicon'),
	settings = require('./app/settings'),
	routes = require('./app/routes/index.js'),

	errorHandler = require('errorHandler'),
	logger = require('morgan'),

	app = express()

app.set('port', process.env.PORT || 3000)
//app.set('views', path.join(__dirname, 'app/views'))
//app.set('view engine', 'ejs')

app.use(methodOverride())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	secret: settings.cookieSecret,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	},
	resave: false,
	saveUninitialized: true
}))
app.use(compression())
//app.use(favicon(path.join(__dirname, 'build/images/favicon.ico')))
app.use('/public', express.static(path.join(__dirname, 'public')))

if ('development' === app.get('env')) {
	app.use(logger('dev'))
	app.use(errorHandler())
}

routes(app)
app.get('*', function (req, res) {
	res.sendFile(__dirname + '/public/index.html')
})

app.listen(app.get('port'), function () {
	console.log('Server is running on ' + app.set('port'))
})
var express = require('express'),

  path = require('path'),
  util = require('util'),

  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),

  methodOverride = require('method-override'),
  compression = require('compression'),

  favicon = require('serve-favicon'),
  settings = require('./server/settings'),
  routes = require('./server/routes/index.js'),
  
  // mongoose = require('mongoose'),
  //dbURL = process.env.dbURL || settings.dbURL,
  
  logger = require('morgan'),
  errorHandler = require('errorhandler'),

  app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname))
app.set('view engine', 'ejs')

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
app.use(favicon(path.join(__dirname, 'dist/favicon.ico')))

// mongoose.connect(dbURL)

if ('development' === app.get('env')) {
	app.use(logger('dev'))
	app.use(errorHandler())
}

app.use('/static', express.static(path.join(__dirname, 'dist')))
routes(app)
app.get('*', function (req, res) {
	res.render('index', {
    window_username: req.session.username || '',
    ctx: process.env.staticDomain ? process.env.staticDomain : 'http://localhost:' + app.get('port')
  })
})

app.listen(app.get('port'), function () {
	console.log('Server is running on ' + app.set('port'))
})
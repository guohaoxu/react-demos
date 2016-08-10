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

  logger = require('morgan'),
  errorHandler = require('errorhandler'),

  mongoose = require('mongoose'),
  dbURL = process.env.dbURL || settings.dbURL,

  app = express()

mongoose.connect(dbURL)

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

if ('development' === app.get('env')) {
	app.use(logger('dev'))
	app.use(errorHandler())
}

app.use('/static', express.static(path.join(__dirname, 'dist')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

routes(app)

// if ('development' === app.get('env')) {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500)
//     res.render('error', {
//       message: err.message,
//       error: err
//     })
//   })
// }
//
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500)
//   res.render('error', {
//     message: err.message,
//     error: {}
//   })
// })

app.listen(app.get('port'), function () {
  console.log('Server is running on ' + app.set('port'))
})

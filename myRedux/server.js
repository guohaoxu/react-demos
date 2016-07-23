var express = require('express'),

	path = require('path'),
	util = require('util'),

	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),

	methodOverride = require('method-override'),
	compression = require('compression'),

	errorHandler = require('errorHandler'),
	logger = require('morgan'),

	favicon = require('serve-favicon'),
	settings = require('./app/settings'),
	//routes = require('./app/routes/index.js'),

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

//routes(app)
app.get('/contactsApp', function (req, res) {
	setTimeout(() => 
		res.json([
		  { name: "Cassio Zen", email: "cassiozen@gmail.com" },
		  { name: "Dan Abramov", email: "danabramov@gmail.com" },
		  { name: "Pete Hunt", email: "petehunt@gmail.com" },
		  { name: "Paul O'Shannessy", email: "pualoshannessy@gmail.com" },
		  { name: "Ryan Florence", email: "ryanflorence@gmail.com" },
		  { name: "Sebastian Markbage", email: "sebastian@gmail.com" }
		]), 2000)
})
app.get('/kanban/cards', (req, res) => {
	setTimeout(() => 
		res.json([
		  {
		    id: 1,
		    title: "Read the BookRead the Book",
		    description: "I should read the whole book.\n\n![](/public/imgs/boy.jpg)",
		    color: "#bd8d31",
		    status: "in-progress",
		    tasks: []
		  },
		  {
		    id: 2,
		    title: "Write some code",
		    description: "Code along with the samples in the book **Pro React**. The complete source can be found at [github](https://github.com/pro-react).\n\n`console.log('What?')`",
		    color: "#3a7e28",
		    status: "todo",
		    tasks: [
		      {
		        id: 1,
		        name: "ComtactList Example",
		        done: true
		      },
		      {
		        id: 2,
		        name: "Kanban Example",
		        done: false
		      },
		      {
		        id: 3,
		        name: "My own experiments",
		        done: false
		      }
		    ]
		  },
		  {
		    id: 3,
		    title: "Play the game",
		    description: "I have played CS game yet.",
		    color: "#b66",
		    status: "done",
		    tasks: [
		      {
		        id: 1,
		        name: "Set the C4 boom!",
		        done: true
		      }
		    ]
		  },
		  {
		    id: 4,
		    title: "Cooke the food",
		    description: "I should cook the reac.js food.",
		    color: "#66b",
		    status: "todo",
		    tasks: [
		      {
		        id: 1,
		        name: "read the reac.js book.",
		        done: true
		      },
		      {
		        id: 2,
		        name: "write some react code",
		        done: false
		      }
		    ]
		  }
		]), 2000)
})

app.get('*', function (req, res) {
	res.sendFile(__dirname + '/public/index.html')
})

app.listen(app.get('port'), function () {
	console.log('Server is running on ' + app.set('port'))
})
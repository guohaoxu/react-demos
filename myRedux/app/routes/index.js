var Message = require('../models/message.js'),
  update = require('react-addons-update')

module.exports = function (app) {

    app.get('/api/comments', function (req, res) {
        Message.find({}, function (err, docs) {
            if (err) return console.error(err)
            res.send(docs)
        })
    })

    app.post('/api/comments', function (req, res) {
        var author = req.body.author,
            text = req.body.text,
            newMessage = new Message({
                id: Math.random(),
                author: author,
                text: text
            })
        newMessage.save(function(err, doc) {
            if (err) return console.error(err)
            console.log(doc)
            res.send(doc)
        })

    })
    
    
    /**
    * contactsApp api
    */
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
    
    /**
    * kanban api
    */
    var cards = [
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
    ]
    app.get('/cards', (req, res) => {
    	setTimeout(() => 
    		res.json(cards), 1000)
    })
    app.del('/cards/:cardId/tasks/:taskIndex', (req, res) => {
      let card_id = Number(req.params.cardId)
      let task_index = Number(req.params.taskIndex)
      let cardIndex = cards.findIndex((card) => card.id === card_id)
      
      let nextState = update(cards, {
        [cardIndex]: {
          tasks: {$splice: [[task_index, 1]]}
        }
      })
      cards = nextState
      res.json({
        success: true
      })
    })
    app.put('/cards/:cardId/tasks/:taskIndex', (req, res) => {
      let card_id = Number(req.params.cardId)
      let task_index = Number(req.params.taskIndex)
      let newDoneValue = req.body.done
      let cardIndex = cards.findIndex((card) => card.id === card_id)
      let nextState = update(cards, {
        [cardIndex]: {
          tasks: {
            [task_index]: {
              done: {$apply: (done) => newDoneValue}
            }
          }
        }
      })
      cards = nextState
      res.json({
        success: true
      })
    })
    app.post('/cards/:cardId/tasks', (req, res) => {
      let card_id = Number(req.params.cardId)
      let cardIndex = cards.findIndex((card) => card.id === card_id)
      let newTask = req.body
      let nextState = update(cards, {
        [cardIndex]: {
          tasks: {$push: [newTask]}
        }
      })
      cards = nextState
      res.json({
        success: true
      })
    })
}

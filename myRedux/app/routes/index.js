var Card = require('../models/card.js')

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
  
  var cards = []
  app.get('/cards', (req, res) => {
  	setTimeout(() => 
  		res.json(cards), 0)
  })
  app.delete('/cards/:cardId/tasks/:taskIndex', (req, res) => {
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
  app.put('/cards/:cardId', (req, res) => {
    let card_id = Number(req.params.cardId)
    let cardIndex = cards.findIndex((card) => card.id === card_id)
    let newStatus = req.body.newStatus
    let nextState = update(cards, {
      [cardIndex]: {
        status: {$apply: (status) => newStatus}
      }
    })
    cards = nextState
    res.json({
      success: true
    })
  })
  app.post('/cards/updatePosition', (req, res) => {
    let cardId = Number(req.body.cardId)
    let afterId = Number(req.body.afterId)
    if (cardId !== afterId) {
      let cardIndex =cards.findIndex((card => card.id === cardId))
      let card = cards[cardIndex]
      let afterIndex = cards.findIndex((card) => card.id === afterId)
      let newState = update(cards, {
        $splice: [
          [cardIndex, 1],
          [afterIndex, 0, card]
        ]
      })
      cards = newState
    }
    res.json({
      success: true
    })
    console.log(cardId, afterId)
  })
  app.post('/cards', (req, res) => {
    let card = req.body
    let nextState = update(cards, {
      $push: [card]
    })
    cards = nextState
    res.json({
      success: true
    })
  })
}
var Card = require('../models/card.js')

module.exports = function (app) {
  //get cards
  app.get('/cards', function (req, res, next) {
    Card.find({}, function (err, r) {
      if (err) return next(err)
      res.send(r)
    })
  })
  
  // new card
  app.post('/cards', (req, res, next) => {
    let card = req.body,
      newCard = new Card(card)
    newCard.save(function(err, r) {
      if (err) return next(err)
      res.json({
        success: true
      })
    })
  })
  
  // new card task
  app.post('/cards/:cardId/tasks', (req, res) => {
    let cardId = Number(req.params.cardId),
      newTask = req.body
    Card.findOneAndUpdate({
      id: cardId
    }, {
      $push: {
        tasks: newTask
      }
    }, function (err, r) {
      if (err) return console.error(err)
      res.json({
        success: true
      })
    })
  })
  
  // delete card task
  app.delete('/cards/:cardId/tasks/:taskId', (req, res) => {
    let cardId = Number(req.params.cardId),
      taskId = Number(req.params.taskId)
    Card.findOneAndUpdate({
      id: cardId
    }, {
      $pull: {
        tasks: {
          id: taskId
        }
      }
    }, function (err, r) {
      if (err) return console.error(err)
      res.json({
        success: true
      })
    })
  })
  
  // toggle card task
  app.put('/cards/:cardId/tasks/:taskId', (req, res) => {
    let cardId = Number(req.params.cardId),
      taskId = Number(req.params.taskId),
      newDoneValue = req.body.done
    Card.findOneAndUpdate({
      id: cardId,
      'tasks.id': taskId
    }, {
      $set: {
        'tasks.$.done': newDoneValue
      }
    }, function (err, r) {
      if (err) return console.error(err)
      res.json({
        success: true
      })
    })
  })
  
  // put card -> two ways: put status and edit card
  app.put('/cards/:cardId', (req, res) => {
    let put = req.body.do
    let cardId = Number(req.params.cardId)
    if (put === 'updateStatus') {
      let newStatus = req.body.newStatus
      Card.findOneAndUpdate({
        id: cardId
      }, {
        $set: {
          status: newStatus
        }
      }, function (err, r) {
        if (err) return console.error(err)
        res.json({
          success: true
        })
      })
    } else if (put === 'edit') {
      let newCard = req.body.newCard
      Card.findOneAndUpdate({
        id: cardId
      }, {
        $set: {
          title: newCard.title,
          description: newCard.description,
          color: newCard.color,
          status: newCard.status
        }
      }, function (err, r) {
        if (err) return console.error(err)
        res.json({
          success: true
        })
      })
    }
  })

  // update card sort
  app.post('/cards/updatePosition', (req, res) => {
    let cardId = Number(req.body.cardId)
    let afterId = Number(req.body.afterId)
    
    res.json({
      success: true
    })
    console.log(cardId, afterId)
  })
  
  
}
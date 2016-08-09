var User = require('../models/User'),
  Article = require('../models/Article'),
  crypto = require('crypto')

module.exports = function (app) {
  // api
  function checkLogin(req, res, next) {
    if (!req.session.user) {
      return res.json({
        success: false,
        text: '未登录'
      })
    }
    next()
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      return res.json({
        success: false,
        text: '已登录'
      })
    }
    next()
  }
  
  app.get('/api/articles', (req, res) => {
    var p = req.query.p || 1,
      username = req.query.username,
      keyword = req.query.keyword
    if (username !== 'undefined') {
      Article.find({
        author: username
      }).skip(10 * (p - 1)).limit(10).sort({time: -1}).exec((error, r) => {
        if (error) {
          console.error(error)
        } else {
          return res.json({
            success: true,
            data: r
          })
        }
      })
    } else if (keyword !== 'undefined'){
      var k_reg = new RegExp(keyword, 'i');
      Article.find({
        title: k_reg
      }).skip(10 * (p - 1)).limit(10).sort({time: -1}).exec((error, r) => {
        if (error) {
          console.error(error)
        } else {
          return res.json({
            success: true,
            data: r
          })
        }
      })
    } else {
      Article.find({}).skip(10 * (p - 1)).limit(10).sort({time: -1}).exec((error, r) => {
        if (error) {
          console.error(error)
        } else {
          return res.json({
            success: true,
            data: r
          })
        }
      })
    }
    
  })
  
  app.post('/api/reg', checkNotLogin, (req, res) => {
    var username = req.body.username,
      password = req.body.password,
      password_re = req.body.password_re
    if (username.length < 3 || password.length < 6 || password_re.length < 6) {
      return res.json({
        success: false,
        text: '用户名或密码过于简单'
      })
    }
    if (password !== password_re) {
      return res.json({
        success: false,
        text: '俩次输入的密码不一致'
      })
    }
    var md5 = crypto.createHash('md5'),
      newUser = new User({
        username: username,
        password: md5.update(password).digest('hex')
      })
    User.findOne({
      username: username
    }, (error, r) => {
      if (error) {
        console.error(error)
      } else {
        if (r) {
          return res.json({
            success: false,
            text: '用户名已存在'
          })
        }
        newUser.save((error, r) => {
          if (error) {
            console.error(error)
          } else {
            req.session.user = r
            return res.json({
              success: true,
              username: username
            })
          }
        })
      }
    })
  })
  
  app.get('/api/logout', checkLogin, function (req, res) {
    req.session.user = null
    return res.json({
      success: true
    })
  })
  
  app.post('/api/login', checkNotLogin, function (req, res) {
    var md5 = crypto.createHash('md5'),
      username = req.body.username,
      password = md5.update(req.body.password).digest('hex')
    User.findOne({
      username: username,
      password: password
    }, (error, r) => {
      if (!r) {
        return res.json({
          success: false,
          text: '用户名或者密码错误'
        })
      }
      req.session.user = r
      res.json({
        success: true,
        username: username
      })
    })
  })
  
  app.post('/api/post', checkLogin, function (req, res) {
    var title = req.body.title,
      tags = req.body.tags,
      content = req.body.content,
      newArticle = new Article({
        author: req.session.user.username,
        title: title,
        tags: tags,
        content: content
      })
    newArticle.save((error, r) => {
      if (error) {
        console.error(error)
      } else {
        return res.json({
          success: true
        })
      }
    })
  })
  
  
  
  app.get('*', function (req, res) {
    res.render('index', {
      window_username: req.session.user ? req.session.user.username : '',
      ctx: process.env.staticDomain ? process.env.staticDomain : 'http://localhost:' + app.get('port')
    })
  })
  
  //get cards
  app.get('/cards', function (req, res, next) {
    Card.find({}).sort({id: 1}).exec(function (err, r) {
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
    Card.findOneAndUpdate({
      id: cardId
    }, {
      $set: {
        id: afterId + 1
      }
    } ,function (err, r) {
      if (err) return console.error(err)
      Card.findOneAndUpdate({
        id: afterId
      }, {
        $set: {
          id: cardId
        }
      }, function (err, r) {
        if (err) return console.error(err)
        Card.findOneAndUpdate({
          id: afterId + 1
        }, {
          $set: {
            id: afterId
          }
        }, function (err, r) {
          if (err) return console.error(err)
          res.json({
            success: true
          })
        })
      })
    })
  })
  
  
}
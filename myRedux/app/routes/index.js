var Message = require('../models/message.js')

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
}

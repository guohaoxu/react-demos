var mongoose = require('mongoose'),
    settings = require('../settings.js'),
    dbURL = process.env.dbURL || settings.dbURL

mongoose.connect(settings.dbURL)

var cardSchema = new mongoose.Schema({
    id: Number,
    author: String,
    text: String,
    date: {
        type: Date,
        default: Date.now
    }
})

//Instance methods
cardSchema.methods.speak = function () {
    console.log(this.sayer)
}

//Statics methods
cardSchema.statics.getFive = function (sayer, toer, cb) {
    this.find({
        $or: [{
            sayer: sayer,
            toer: toer
        }, {
            sayer: toer,
            toer: sayer
        }]
    }, cb)
}

var Card = mongoose.model('Card', cardSchema)

module.exports = Card

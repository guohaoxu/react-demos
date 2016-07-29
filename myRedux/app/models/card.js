var mongoose = require('mongoose'),
    settings = require('../settings.js'),
    dbURL = process.env.dbURL || settings.dbURL

mongoose.connect(settings.dbURL)

var cardSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    color: String,
    status: String,
    tasks: Array
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

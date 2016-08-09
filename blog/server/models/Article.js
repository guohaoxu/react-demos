var mongoose = require('mongoose')
  //settings = require('../settings.js'),
  //dbURL = process.env.dbURL || settings.dbURL

//mongoose.connect(dbURL)

var articleSchema = new mongoose.Schema({
  author: String,
  title: String,
  tags: Array,
  content: String,
  time: {
    type: Date,
    default: Date.now()
  },
  comments: [],
  pv: Number
})

//Instance methods
articleSchema.methods.speak = function () {
  //console.log(this.sayer)
}

//Statics methods
articleSchema.statics.getFive = function () {
  //
}

var Article = mongoose.model('Article', articleSchema)

module.exports = Article
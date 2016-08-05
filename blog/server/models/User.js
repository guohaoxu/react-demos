var mongoose = require('mongoose'),
  settings = require('../settings.js'),
  dbURL = process.env.dbURL || settings.dbURL

mongoose.connect(dbURL)

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  description: String,
  email: String,
  tx: {
    type: String,
    default: 'default.jpg'
  }
})

//Instance methods
userSchema.methods.speak = function () {
  //console.log(this.sayer)
}

//Statics methods
userSchema.statics.getFive = function () {
  //
}

var User = mongoose.model('User', userSchema)

module.exports = User
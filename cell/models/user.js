var mongoose = require('mongoose')

var schema = mongoose.Schema({
  name: { type: String },
  picture: { type: String },
  authToken: { type: String }
})

module.exports = mongoose.model('User', schema)
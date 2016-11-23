var mongoose = require('mongoose')

var schema = mongoose.Schema({
  name: { type: String },
  path: { type: String }
})

module.exports = mongoose.model('Picture', schema)
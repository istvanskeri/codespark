var mongoose = require('mongoose')
var Schema = mongoose.Schema

var scoreSchema = new Schema({
  test: { type: String, required: true },
  date: { type: String, required: true },
  score: { type: Number, required: false }
})

module.exports = mongoose.model('Score', scoreSchema)

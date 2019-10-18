var mongoose = require('mongoose')
var Schema = mongoose.Schema

var scoreSchema = new Schema({
  test: { type: String, required: false },
  score: { type: Number, required: false }
})

module.exports = mongoose.model('Score', scoreSchema)

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  average: { type: Number },
  scores: [
    {
      test: { type: String },
      score: { type: Number }
    }
  ]
})

module.exports = mongoose.model('User', userSchema)

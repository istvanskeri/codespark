var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  average: { type: Number },
  scores: [
    {
      test: { type: String, required: true },
      date: { type: Date, required: true },
      score: { type: Number, required: false }
    }
  ]
})

module.exports = mongoose.model('User', userSchema)

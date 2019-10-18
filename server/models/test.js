var mongoose = require('mongoose')
var Schema = mongoose.Schema

var testSchema = new Schema({
  name: { type: String, required: false },
  date: { type: Date, required: false }
})

module.exports = mongoose.model('Test', testSchema)

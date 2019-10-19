var mongoose = require('mongoose')
var User = require('./models/user')
var Test = require('./models/test')
var csv = require("csv-parse")

const fs = require('fs')
const users = []
const scores = []
let tests
let dates

fs.createReadStream('user.csv')
  .pipe(csv())
  .on('data', (data) => {
    if (data.length) {
      const filtered = data.filter(function (el) {
        return el !== ''
      })

      if (filtered.length) {
        users.push(filtered)
      }
    }
  })
  .on('end', () => {
    //console.log(users)
  })

fs.createReadStream('grades.csv')
  .pipe(csv())
  .on('data', (data) => {
    scores.push(data)
  })
  .on('end', () => {
    tests = scores.shift()
    dates = scores.shift()
  })

User.collection.drop()
Test.collection.drop()

mongoose.connect('mongodb://localhost/codespark', function (err) {
  if (err) throw err
  tests.shift()
  users.shift()
  let j = 0
  users.forEach(async function (u) {
    const result = []
    let total = 0
    for (let i = 1; i <= tests.length; i++) {
      console.log(dates);
      if (scores[j][i]) {
        result.push({ 
          test: tests[i-1], 
          date: dates[i], 
          score: parseInt(scores[j][i]) 
        })
        total += parseInt(scores[j][i])
      } else {
       result.push({ test: tests[i-1], date: dates[i] })
      }
    }
    console.log(result);
    var user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstname: u[1],
      lastname: u[2],
      scores: result,
      average: Math.floor(total / tests.length)
    })
    j++
    await user.save()
  })
  console.log('Done')

  tests.forEach(async function (t) {
    var test = new Test({
      _id: new mongoose.Types.ObjectId(),
      name: t,
    })
    await test.save()
    j++
  })
})

var express = require('express')
var router = express.Router()
var User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}).exec(function (err, scoreObj) {
    if (err) throw err
    res.send(scoreObj)
  })
})

module.exports = router;

var express = require('express');
var router = express.Router();

var loginsDB = require('../models/logins');

function sendLoginFile(req, res) {  // GET
    var path = 'login.html';
    res.header('Cache-Control', 'no-cache');
    res.sendFile(path, { "root": "./" });
  }

router.route('/')
  .get(sendLoginFile)

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
function sendIndexFile(req, res) {  // GET
  var path = 'index.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}


router.route('/')
  .get(sendIndexFile);

module.exports = router;

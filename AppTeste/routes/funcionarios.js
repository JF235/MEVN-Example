var express = require('express');
var router = express.Router();

var funcionariosDB = require('../models/funcionarios');

function sendFuncionariosFile(req, res) {  // GET
  var path = 'funcionarios.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}

router.route('/')
  .get(sendFuncionariosFile);

module.exports = router;

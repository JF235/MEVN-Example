var express = require('express');
var router = express.Router();

/* GET home page. */
function sendIndexFile(req, res) {  // GET
  // Verificar qual usuário está logado
  res.header('Cache-Control', 'no-cache');
  
  // Se não tiver ninguém logado
  var path = 'index.html';
  res.sendFile(path, { "root": "./" });

  // Se for administrador
  //var path = 'indexAdm.html';
  //res.sendFile(path, { "root": "./" });
}


router.route('/')
  .get(sendIndexFile);

module.exports = router;

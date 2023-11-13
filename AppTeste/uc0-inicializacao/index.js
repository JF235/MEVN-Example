var express = require('express');
const { checkAuth } = require('../ucx-auxiliar/checkAuth');
var router = express.Router();

/* GET home page. */
function sendIndexFile(req, res) {  // GET
  // Verificar qual usuário está logado
  res.header('Cache-Control', 'no-cache');

  var path;
  var cauth = checkAuth(req, res);
  if (cauth == 'unauthorized'){
    path = './uc0-inicializacao/index.html';
  } else if (cauth == 'admin'){
    path = './uc0-inicializacao/indexAdm.html';
  } else if (cauth == 'user'){
    path =  './uc0-inicializacao/indexUsr.html';
  }

  res.sendFile(path, { "root": "./" });
}

function sendIndexHTMLFile(req, res) {  // GET
  res.header('Cache-Control', 'no-cache');

  res.sendFile('uc0-inicializacao/index.html', { "root": "./" });
}

router.route('/')
  .get(sendIndexFile)

router.route('/index.html')
  .get(sendIndexHTMLFile)

module.exports = router;

var express = require('express');
var router = express.Router();

function checkAuth(req, res) {
  var cookies = req.cookies;
  if (!cookies || !cookies.userAuth)
    return 'unauthorized';
  
  var cauth = cookies.userAuth;
  var content = JSON.parse(cauth);
  
  if (content.key == 'secret' && content.cargo != undefined)
    return content.cargo
  else
    return 'unauthorized';
}

/* GET home page. */
function sendIndexFile(req, res) {  // GET
  // Verificar qual usuário está logado
  res.header('Cache-Control', 'no-cache');

  var path;
  var cauth = checkAuth(req, res);
  if (cauth == 'unauthorized'){
    path = 'index.html';
  } else if (cauth == 'admin'){
    path = 'indexAdm.html';
  }

  res.sendFile(path, { "root": "./" });
}

function sendIndexHTMLFile(req, res) {  // GET
  res.header('Cache-Control', 'no-cache');

  res.sendFile('index.html', { "root": "./" });
}

router.route('/')
  .get(sendIndexFile)

router.route('/index.html')
  .get(sendIndexHTMLFile)

module.exports = router;

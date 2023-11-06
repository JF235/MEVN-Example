var express = require('express');
var router = express.Router();

var loginsDB = require('../models/logins');

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

function sendLoginFile(req, res) {  // GET
  var path = './uc2-login/login.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}

async function realizarLogin(req, res) {

  // Verificar se o ID usado já não está no Banco de Dados, fazendo uma
  // query com id
  var query = { "cpf": req.body.cpf };
  var data = await loginsDB.findOne(query);
  console.log(data);

  // ID inexistente
  if (data === null) {
    response = { "resultado": "cpf nao encontrado" };
    res.status(401).send("Falha na autenticação");
    return;
  }

  if (data.senha === req.body.senha) {
    var content = { "key": "secret", "cargo": data.cargo };
    res.cookie("userAuth", JSON.stringify(content), { "maxAge": 3600000 * 24 * 5 });
    res.status(200).send("Sucesso");
  } else {
    res.status(401).send("Falha na autenticação");
  }
}

function logoutCurrentUser(req, res) {
  if (checkAuth(req, res) != 'unauthorized') {
    res.clearCookie('userAuth');	 // remove cookie no cliente
    res.status(200).send('Sucesso');
  } else {
    res.status(401).send('Unauthorized');
  }
}

router.route('/')
  .get(sendLoginFile)
  .post(realizarLogin)
  .delete(logoutCurrentUser)

module.exports = router;
var express = require('express');
var router = express.Router();
const { checkAuth } = require('../ucx-auxiliar/checkAuth');

var loginsDB = require('../models/logins');

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
    res.status(401).json({ "resultado": "Falha na autenticação" });
    return;
  }

  if (data.senha === req.body.senha) {
    var content = { "key": "secret", "cargo": data.cargo };
    res.cookie("userAuth", JSON.stringify(content), { "maxAge": 3600000 * 24 * 5 });
    res.status(200).json({ "resultado": "Sucesso" });
  } else {
    res.status(401).json({ "resultado": "Falha na autenticação" });
  }
}

function logoutCurrentUser(req, res) {
  if (checkAuth(req, res) != 'unauthorized') {
    res.clearCookie('userAuth');	 // remove cookie no cliente
    res.status(200).json({ "resultado": "Sucesso" });
  } else {
    res.status(401).json({ "resultado": "Unauthorized" });
  }
}

router.route('/')
  .get(sendLoginFile)
  .post(realizarLogin)
  .delete(logoutCurrentUser)

module.exports = router;
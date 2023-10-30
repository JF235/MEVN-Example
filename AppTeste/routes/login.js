var express = require('express');
var router = express.Router();

var loginsDB = require('../models/logins');

function sendLoginFile(req, res) {  // GET
  var path = 'login.html';
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
    var content = { "cpf": req.body.cpf, "key": "secret" };
    res.cookie("userAuth", JSON.stringify(content), { "maxAge": 3600000 * 24 * 5 });
    res.status(200).send("Sucesso");
  } else {
    res.status(401).send("Falha na autenticação");
  }
}

router.route('/')
  .get(sendLoginFile)
  .post(realizarLogin)

module.exports = router;
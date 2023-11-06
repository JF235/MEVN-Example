var express = require('express');
var router = express.Router();

var loginsDB = require('../models/logins');

function sendCadastroFile(req, res) {  // GET
  var path = './uc1-cadastro/cadastro.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}

async function criarUsuario(req, res) {  // POST

  // Verificar se o ID usado já não está no Banco de Dados, fazendo uma
  // query com id
  var query = { "cpf": req.body.cpf };
  var response = {};
  var data = await loginsDB.findOne(query);
  console.log(data);

  // ID já existente
  if (data !== null) {
    response = { "resultado": "usuario ja existente" };
    res.json(response);
    return;
  }

  // Salvar no banco de dados
  var db = new loginsDB(); // Conexão com o banco de dados
  db.cpf = req.body.cpf;
  db.nome = req.body.nome;
  db.senha = req.body.senha;
  db.cargo = "user";
  try {
    db.save();
    response = { "resultado": "usuario inserido" };
  } catch (err) {
    response = { "resultado": "falha de acesso ao BD" };
  }

  res.json(response);
}

router.route('/')
  .get(sendCadastroFile)
  .post(criarUsuario)

module.exports = router;
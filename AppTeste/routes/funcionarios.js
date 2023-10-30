var express = require('express');
var router = express.Router();

var funcionariosDB = require('../models/funcionarios');

function sendFuncionariosFile(req, res) {  // GET
  var path = 'funcionarios.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}

async function inserirFuncionario(req, res) {  // POST
  // Verificar autenticação
  // not implemented...

  // Verificar se o ID usado já não está no Banco de Dados, fazendo uma
  // query com id
  var query = { "id": req.body.id };
  var response = {};
  var data = await funcionariosDB.findOne(query);
  console.log(data);

  // ID já existente
  if (data !== null) {
    response = { "resultado": "funcionario ja existente" };
    res.json(response);
    return;
  }

  // Salvar no banco de dados
  var db = new funcionariosDB(); // Conexão com o banco de dados
  db.id = req.body.id;
  db.nome = req.body.nome;
  db.cargo = req.body.cargo;
  try {
    db.save();
    response = { "resultado": "funcionario inserido" };
  } catch (err) {
    response = { "resultado": "falha de acesso ao BD" };
  }

  res.json(response);
}

async function alteraFuncionario(req, res) {   // PUT
  // Verifica autenticação
  // ...
  
  // Prepara a query
  var response = {};
  var query = { "id": req.body.id };
  var data = await funcionariosDB.findOne(query);

  response = {};
  query = { "id": req.body.id };
  data = { "nome": req.body.nome, "cargo": req.body.cargo };
  
  // Realiza a query e responde
  try {
    var dat = await funcionariosDB.findOneAndUpdate(query, data);
    if (dat == null)
      response = { "resultado": "funcionario inexistente" };
    else
      response = { "resultado": "funcionario atualizado" };
  } catch (err) {
    response = { "resultado": "falha de acesso ao DB" };
  }

  res.json(response);
}

router.route('/')
  .get(sendFuncionariosFile)
  .post(inserirFuncionario);

router.route('/:id')   // operacoes sobre um funcionario
  .put(alteraFuncionario);

module.exports = router;

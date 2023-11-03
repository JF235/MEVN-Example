var express = require('express');
var router = express.Router();

// Banco de dados de funcionários cadastrados
var funcionariosDB = require('../models/funcionarios');

// Envia a página de gerenciamento de funcionários
function sendFuncionariosFile(req, res) {  // GET
  // Verificar autenticação
  // not implemented...

  var path = 'funcionarios.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}

async function inserirFuncionario(req, res) {  // POST
  // Verificar autenticação
  // not implemented...

  // Verificar se o ID usado já não está no Banco de Dados, 
  // fazendo uma query com id
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

  // ID de funcionário novo
  // Salva no banco de dados
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
  var data = req.body.novosDados;

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

async function deletaFuncionario(req, res) {   // DELETE (remove)
  // Verifica autenticação
  // ...

  // Monta requisição
  var response = {};
  var query = { "id": req.body.id };

  // Remove
  try {
    var data = await funcionariosDB.findOneAndRemove(query);
    if (data == null)
      response = { "resultado": "funcionário inexistente" };
    else
      response = { "resultado": "funcionário removido" };
  } catch (err) {
    response = { "resultado": "falha de acesso ao DB" };
  }
  res.json(response);
}

async function obterTodosFuncionarios(req, res) {  // GET
  // Obtém todos os funcionários
  res.header('Cache-Control', 'no-cache');
  
  var response = {};

  try {
    var data = await funcionariosDB.find({});
    response = { "funcionarios": data };
  } catch (err) {
    response = { "resultado": "falha de acesso ao BD" };
  }
  res.json(response);
}

router.route('/')
  .get(sendFuncionariosFile)
  .post(inserirFuncionario);

router.route('/:id')
  .put(alteraFuncionario)
  .delete(deletaFuncionario);

router.route('/all')
  .get(obterTodosFuncionarios);

module.exports = router;

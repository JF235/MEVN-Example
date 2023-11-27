var express = require('express');
var router = express.Router();
const { checkAuth } = require('../ucx-auxiliar/checkAuth');

// Banco de dados de funcionários cadastrados
var loginsDB = require('../models/logins');

// Envia a página de gerenciamento de funcionários
function sendFuncionariosFile(req, res) {  // GET
  if (checkAuth(req, res) != 'admin') {
    res.status(401).json({'resultado': 'Unauthorized'});
    return;
  }

  var path = './uc3-funcionarios/funcionarios.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}

async function inserirFuncionario(req, res) {  // POST
  // Verificar autenticação
  if (checkAuth(req, res) != 'admin') {
    res.status(401).json({'resultado': 'Unauthorized'});
    return;
  }

  // Consulta banco de dados por cpf
  var query = { "cpf": req.body.cpf };
  var response = {};
  var data = await loginsDB.findOne(query);
  console.log(data);

  // cpf já existente
  if (data !== null) {
    response = { "resultado": "funcionario ja existente" };
    res.json(response);
    return;
  }

  // cpf de funcionário novo
  // Salva no banco de dados
  var db = new loginsDB(); // Conexão com o banco de dados
  db.cpf = req.body.cpf;
  db.datanascimento = req.body.datanascimento;
  db.senha = req.body.senha;
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
  if (checkAuth(req, res) != 'admin') {
    res.status(401).json({'resultado': 'Unauthorized'});
    return;
  }

  // Prepara a query
  var response = {};
  var query = { "cpf": req.body.cpf };
  var data = req.body.novosDados;

  // Realiza a query e responde
  try {
    var dat = await loginsDB.findOneAndUpdate(query, data);
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
  if (checkAuth(req, res) != 'admin') {
    res.status(401).json({'resultado': 'Unauthorized'});
    return;
  }
  // Monta requisição
  var response = {};
  var query = { "cpf": req.body.cpf };

  // Remove
  try {
    var data = await loginsDB.findOneAndRemove(query);
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
  if (checkAuth(req, res) != 'admin') {
    res.status(401).json({'resultado': 'Unauthorized'});
    return;
  }
  
  // Obtém todos os funcionários
  res.header('Cache-Control', 'no-cache');

  var response = {};

  try {
    var data = await loginsDB.find({});
    response = { "funcionarios": data };
  } catch (err) {
    response = { "resultado": "falha de acesso ao BD" };
  }
  res.json(response);
}

async function removerTodosFuncionarios(req, res) { // DELETE
  if (checkAuth(req, res) != 'admin') {
    res.status(401).json({'resultado': 'Unauthorized'});
    return;
  }

  // Remove todos os funcionários
  var response = {};

  try {
    await loginsDB.deleteMany({});
    response = { "resultado": "Todos os funcionários foram removidos com sucesso" };
  } catch (err) {
    response = { "resultado": "Falha ao remover funcionários do BD" };
  }
  res.json(response);
}

router.route('/')
  .get(sendFuncionariosFile)
  .post(inserirFuncionario);

router.route('/:cpf')
  .put(alteraFuncionario)
  .delete(deletaFuncionario);

router.route('/0/all')
  .get(obterTodosFuncionarios)
  .delete(removerTodosFuncionarios);

module.exports = router;

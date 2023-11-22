var express = require('express');
var router = express.Router();
const { checkAuth } = require('../ucx-auxiliar/checkAuth');

// Banco de dados de funcionários cadastrados
var viagensDB = require('../models/viagens');

// Envia a página de gerenciamento de funcionários
function sendViagensFile(req, res) {  // GET
    if (checkAuth(req, res) != 'admin') {
        res.status(401).json({ 'resultado': 'Unauthorized' });
        return;
    }

    var path = './uc4-viagens/viagens.html';
    res.header('Cache-Control', 'no-cache');
    res.sendFile(path, { "root": "./" });
}

async function inserirViagem(req, res) {  // POST
    // Verificar autenticação
    if (checkAuth(req, res) != 'admin') {
        res.status(401).json({ 'resultado': 'Unauthorized' });
        return;
    }

    // Consulta banco de dados por id
    var query = { "id": req.body.id };
    var response = {};
    var data = await viagensDB.findOne(query);
    console.log(data);

    // cpf já existente
    if (data !== null) {
        response = { "resultado": "viagem ja existente" };
        res.json(response);
        return;
    }

    // cpf de funcionário novo
    // Salva no banco de dados
    var db = new viagensDB(); // Conexão com o banco de dados
    db.id = req.body.id;
    db.chegada = req.body.chegada;
    db.partida = req.body.partida;
    db.nome = req.body.nome;
    db.data = req.body.data;
    db.maxPassageiros = req.body.maxPassageiros;
    try {
        db.save();
        response = { "resultado": "viagem inserida" };
    } catch (err) {
        response = { "resultado": "falha de acesso ao BD" };
    }

    res.json(response);
}

async function obterTodasViagens(req, res) {  // GET
    if (checkAuth(req, res) != 'admin') {
        res.status(401).json({ 'resultado': 'Unauthorized' });
        return;
    }

    // Obtém todos os funcionários
    res.header('Cache-Control', 'no-cache');

    var response = {};

    try {
        var data = await viagensDB.find({});
        response = { "viagens": data };
    } catch (err) {
        response = { "resultado": "falha de acesso ao BD" };
    }
    res.json(response);
}

async function alteraViagem(req, res) {   // PUT
    // Verifica autenticação
    if (checkAuth(req, res) != 'admin') {
        res.status(401).json({ 'resultado': 'Unauthorized' });
        return;
    }

    // Prepara a query
    var response = {};
    var query = { "id": req.body.id };
    var data = req.body.novosDados;

    // Realiza a query e responde
    try {
        var dat = await viagensDB.findOneAndUpdate(query, data);
        if (dat == null)
            response = { "resultado": "Viagem inexistente" };
        else
            response = { "resultado": "Viagem atualizada" };
    } catch (err) {
        response = { "resultado": "falha de acesso ao DB" };
    }

    res.json(response);
}

async function deletaViagem(req, res) {   // DELETE (remove)
    // Verifica autenticação
    if (checkAuth(req, res) != 'admin') {
        res.status(401).json({ 'resultado': 'Unauthorized' });
        return;
    }
    // Monta requisição
    var response = {};
    var query = { "id": req.body.id };

    // Remove
    try {
        var data = await viagensDB.findOneAndRemove(query);
        if (data == null)
            response = { "resultado": "Viagem inexistente" };
        else
            response = { "resultado": "Viagem removido" };
    } catch (err) {
        response = { "resultado": "falha de acesso ao DB" };
    }
    res.json(response);
}

async function deletarTodasViagens(req, res) { // DELETE
    if (checkAuth(req, res) != 'admin') {
        res.status(401).json({ 'resultado': 'Unauthorized' });
        return;
    }

    // Remove todos os
    var response = {};

    try {
        await viagensDB.deleteMany({});
        console.log("Todas as viagens foram removidas com sucesso")
        response = { "resultado": "Todas as viagens foram removidas com sucesso" };
    } catch (err) {
        console.log(err)
        response = { "resultado": "Falha ao remover viagens do BD" };
    }
    res.json(response);
}

router.route('/')
    .get(sendViagensFile)
    .post(inserirViagem);

router.route('/:id')
    .put(alteraViagem)
    .delete(deletaViagem);

router.route('/:id/all')
    .get(obterTodasViagens)
    .delete(deletarTodasViagens)

module.exports = router;
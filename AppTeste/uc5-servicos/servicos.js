var express = require('express');
var router = express.Router();

const { checkAuth } = require('../ucx-auxiliar/checkAuth');

var viagensDB = require('../models/viagens');

function sendSolEntregaFile(req, res) {  // GET
    res.header('Cache-Control', 'no-cache');

    var path = './uc5-servicos/solicitacaoEntrega.html';
    res.sendFile(path, { "root": "./" });
}

function sendCompraPassagFile(req, res) {  // GET
    res.header('Cache-Control', 'no-cache');

    var path = './uc5-servicos/solicitacaoEntrega.html';
    res.sendFile(path, { "root": "./" });
}

async function buscarViagem(req, res) {
    if (checkAuth(req, res) != 'user') {
        res.status(401).json({ 'resultado': 'Unauthorized' });
        return;
    }

    res.header('Cache-Control', 'no-cache');

    var response = {};

    try {
        var data = await viagensDB.find({"chegada": req.body.chegada, "partida": req.body.partida});
        response = { "viagens": data };
    } catch (err) {
        response = { "resultado": "falha de acesso ao BD" };
    }
    res.json(response);
}

function sendEscolhaViagemFile(req, res) {  // GET
    res.header('Cache-Control', 'no-cache');

    var path = './uc5-servicos/escolhaViagem.html';
    res.sendFile(path, { "root": "./" });
}

router.route('/escolhaViagem')
    .get(sendEscolhaViagemFile)
    .post(buscarViagem);

router.route('/solicitacaoEntrega')
    .get(sendSolEntregaFile);

router.route('/compraPassagem')
    .get(sendCompraPassagFile);

module.exports = router;

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

    var path = './uc5-servicos/compraPassagem.html';
    res.sendFile(path, { "root": "./" });
}

async function buscarViagem(req, res) {
    if (checkAuth(req, res) === "unauthorized") {
        res.status(401).json({ 'resultado': 'Unauthorized' });
        return;
    }

    res.header('Cache-Control', 'no-cache');

    var response = {};

    try {
        var data = await viagensDB.find({ "chegada": req.body.chegada, "partida": req.body.partida });
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

async function confirmarPassagens(req, res) { // POST
    if (checkAuth(req, res) === "unauthorized") {
        res.status(401).json({ 'resultado': 'Unauthorized' });
        return;
    }

    res.header('Cache-Control', 'no-cache');

    var response = {};
    var query = { "id": req.body.id };
    try {
        var data = await viagensDB.findOne(query);
        if (req.body.passageiros.length + data.passageiros.length > data.maxPassageiros) {
            response = { "resultado": "Viagem cheia" };
        }
        else {
            response = { "resultado": "Passageiros inseridos" };
            data.passageiros = data.passageiros.concat(req.body.passageiros);
            var data = await viagensDB.findOneAndUpdate(query, {"passageiros": data.passageiros});
        }

    } catch (err) {
        response = { "resultado": "falha de acesso ao BD" };
    }
    res.json(response);
}

router.route('/escolhaViagem')
    .get(sendEscolhaViagemFile)
    .post(buscarViagem);

router.route('/solicitacaoEntrega')
    .get(sendSolEntregaFile);

router.route('/compraPassagem/:id')
    .get(sendCompraPassagFile)
    .post(confirmarPassagens)

module.exports = router;

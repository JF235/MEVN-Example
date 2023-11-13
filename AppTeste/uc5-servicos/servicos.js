var express = require('express');
var router = express.Router();


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

function sendEscolhaViagemFile(req, res) {  // GET
    res.header('Cache-Control', 'no-cache');

    var path = './uc5-servicos/escolhaViagem.html';
    res.sendFile(path, { "root": "./" });
}

router.route('/escolhaViagem')
    .get(sendEscolhaViagemFile);

router.route('/solicitacaoEntrega')
    .get(sendSolEntregaFile);

router.route('/compraPassagem')
    .get(sendCompraPassagFile);

module.exports = router;

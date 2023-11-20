var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/viagensDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;

// Modifique aqui
var viagensSchema = new Schema({
    "id": String,
    "partida": String,
    "chegada": String,
    "data": String,
    "passageiros": {type: [{nome: String, cpf: String}], 
                    default: []},
    "maxPassageiros": Number,
});
module.exports = conn1.model('viagens', viagensSchema);

var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/', {useNewUrlParser: true});
var Schema = mongoose.Schema;

// Modifique aqui
var funcionariosSchema = new Schema({
    "id": String,
    "nome": String,
    "cargo": String
});
module.exports = conn1.model('funcionarios', funcionariosSchema);

var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/', {useNewUrlParser: true});
var Schema = mongoose.Schema;

// Modifique aqui
var loginsSchema = new Schema({
    "cpf": String,
    "datanascimento": String,
    "nome": String,
    "cargo": String,
    "senha": String
});
module.exports = conn1.model('logins', loginsSchema);

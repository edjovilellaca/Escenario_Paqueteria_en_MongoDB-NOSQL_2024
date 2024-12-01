const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    CURP: {type: String},
    nombre: {type: String},
    apellidos: {type: String},
    email: {type: String}
});

const cliente = mongoose.model('cliente', clienteSchema);
module.exports = cliente;
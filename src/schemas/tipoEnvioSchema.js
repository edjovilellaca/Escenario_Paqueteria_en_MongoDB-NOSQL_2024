const mongoose = require('mongoose');

const tipoEnvioSchema = mongoose.Schema({
    ID: {type: Number},
    desc: {type: String},
    precioKM: {type: Number},
    tiempoEntrega: {type: String}
});

const tipoEnvio = mongoose.model('tipoEnvio', tipoEnvioSchema);
module.exports = tipoEnvio;
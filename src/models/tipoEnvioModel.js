const mongoose = require('mongoose');

const tipoEnvioModel = mongoose.Schema({
    ID: {type: Number},
    desc: {type: String},
    precioKM: {type: Number},
    tiempoEntrega: {type: String}
});

module.exports = mongoose.model('tipoEnvio', tipoEnvioModel);
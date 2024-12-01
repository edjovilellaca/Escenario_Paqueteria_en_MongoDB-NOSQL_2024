const mongoose = require('mongoose');

const envioSchema = mongoose.Schema({
    ID: {type: Number},
    fechaEnvio: {type: Date},
    origen:  {type: mongoose.Schema.Types.String, ref: 'oficina'},
    destino: {type: mongoose.Schema.Types.String, ref: 'oficina'},
    tipoEnvio: {type: mongoose.Schema.Types.Number, ref: 'tipoEnvio'},
    cliente: [
        {CURP:  {type: mongoose.Schema.Types.String, ref: 'cliente'}},
        {email: {type: mongoose.Schema.Types.String, ref: 'cliente'}}
    ],
    peso: {type: Number},
    dimensiones: [
        {largo: {type: Number}},
        {ancho: {type: Number}},
        {alto:  {type: Number}}
    ],
    costoTotal: {type: Number},
    estatus: {type: String}
});

const envio = mongoose.model('envio', envioSchema);
module.exports = envio;

//{type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true}
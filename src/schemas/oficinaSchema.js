const mongoose = require('mongoose');

const oficinaSchema = mongoose.Schema({
    ID: {type: String}, 
    nombre: {type: String},
    direccion: {
        calle: {type: String},
        numero: {type: Number},
        ciudad: {type: String},
        CP: {type: Number}
    },
    telefono: {type: Number},
    email: {type: String}
});

const oficina = mongoose.model('oficina', oficinaSchema);
module.exports = oficina;
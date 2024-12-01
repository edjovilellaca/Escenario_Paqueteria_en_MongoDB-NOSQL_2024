const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    ID: {type: Number},
    fechaEnvio: {type: Date},
    origen: {
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
    },
    destino:  {
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
    },

    tipoEnvio: {type: mongoose.Types.ObjectId, ref: 'tipoEnvio'},
    cliente: {
        CURP: {type: String},
        nombre: {type: String},
        apellidos: {type: String},
        email: {type: String}
    },
    peso: {type: Number},
    dimensiones:  {
        largo: {type: Number},
        ancho: {type: Number},
        alto: {type: Number}
    },
    costoTotal: {type: Number},
    estatus: {type: String}
});

const todo = mongoose.model('todo', todoSchema);
module.exports = todo;
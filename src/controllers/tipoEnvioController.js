const tipoEnvioModel = require('../models/tipoEnvioModel');
const tipoEnvio = require('../models/tipoEnvioModel');
const mongoose = require('mongoose');

const tipoEnvioId = async (req, res) => {
    try {
        const objetoId = req.params;
        const tipoId = await tipoEnvio.find({ _id: objetoId});
        res.status(200).json(tipoId);
        return tipoId;
    } catch (error) {
        res.status(500).json(error);
    }
};

const nuevoTipoEnvio = async (req, res) => {
    const respuesta = req.body;
    const tipo = await tipoEnvio.aggregate([
        { $group: { _id: null, maxID: { $max: "$ID" }, maxObjId: { $max: "$_id" } } }
      ]);

    const nuevoID = tipo[0].maxID + 1;
    const ultimoObjId = tipo[0].maxObjId.toString();
    const incrementedObjId = new mongoose.Types.ObjectId(  //No voy a mentir, esta parte se la echó chatgpt y la verdad si se rifó, yo le hubiera hecho a puro if pq me daba flojera investigar librerias
        (BigInt("0x" + ultimoObjId) + BigInt(1)).toString(16).padStart(24, "0")
    );

    try {
        const tipoEnvioN = await tipoEnvio.create({
            ID: nuevoID,
            desc: respuesta.desc,
            precioKM: respuesta.precioKm,
            tiempoEntrega: respuesta.tiempoEntrega,
            _id: new mongoose.Types.ObjectId(incrementedObjId)
        });
        res.status(200).json(tipoEnvioN);
    } catch (error) {
        res.status(500).json(error);
    }
};

const meterTiposEnvio = async (req, res) => {
    try {
        const meter = await tipoEnvio.insertMany([
            {
                ID: 1,
                desc: "terrestre",
                precioKM: 10,
                tiempoEntrega: "1 SEMANA",
                _id: new mongoose.Types.ObjectId('674e262b88019990e1eef212')
            },
            {
                ID: 2,
                desc: "aéreo",
                precioKM: 20,
                tiempoEntrega: "4 DIAS",
                _id: new mongoose.Types.ObjectId('674e262b88019990e1eef213')
            },
            {
                ID: 3,
                desc: "express",
                precioKM: 35,
                tiempoEntrega: "1 DIA",
                _id: new mongoose.Types.ObjectId('674e262b88019990e1eef214')
            }
        ]);
        return res.status(201).json({
            message: "Datos insertados exitosamente",
            data: meter
        });
    } catch (error) {
        console.error("Error al insertar datos:", error);

        return res.status(500).json({
            message: "Error al insertar los datos",
            error: error.message
        });
    }
}

module.exports = {tipoEnvioId, nuevoTipoEnvio, meterTiposEnvio, };
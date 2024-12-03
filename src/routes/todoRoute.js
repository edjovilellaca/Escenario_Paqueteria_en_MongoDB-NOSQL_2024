const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const tipoEnvioController = require('../controllers/tipoEnvioController');

// Meter datos
router.post('/meterEnvios', tipoEnvioController.meterTiposEnvio);
router.post('/paquetes', todoController.meterEnvios);

// Querys
router.get('/obtenerTodasOficinas', todoController.obtenerTodasOficinas);                       // Q1. Listar los datos de todas las oficinas
router.get('/enviosTransitoEnOficina/:id', todoController.enviosTransitoEnOficina);             // Q2. Listar los envíos realizados en determinada oficina con estatus en tránsito.
router.get('/enviosMetodoEspecifico/:tipoDeEnvio', todoController.enviosMetodoEspecifico);      // Q3. Listar los envíos que utilizan un tipo específico de envío.
router.get('/enviosPorCliente/:CURP', todoController.enviosPorCliente);                         // Q4. Listar los envíos realizados por un cliente en específico en todas las oficinas.
router.get('/clientesEnviosOficina/:id', todoController.clientesEnviosOficina);                 // Q5. Listar los clientes que han realizado envíos en una determinada oficina.
router.get('/oficinasEntregado', todoController.oficinasEntregado);                             // Q6. Listar los envíos de todas las oficinas con estatus de entregado.
router.get('/clientesEnviosTerrestres', todoController.clientesEnviosTerrestres);               // Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.
router.get('/clientesEnviosExpressOficina/:id', todoController.clientesEnviosExpressOficina);   // Q8. Listar los clientes y sus envíos se han remitido por el servicio express considerando una oficina en específico.

//Un post porque no me acordaba si lo había pedido o no
router.post('/nuevoTipoEnvio', tipoEnvioController.nuevoTipoEnvio);                             // Post por si acaso. POSTsiacaso jajajajajajajajaja

module.exports = router;
const todo = require('../models/todoModel');
const tipoEnvio = require('../models/tipoEnvioModel');
const conseguirId = require('./tipoEnvioController');

// Q1. Listar los datos de todas las oficinas
const obtenerTodasOficinas = async (req, res) => {
    try {
        /* const oficinas = await todo.aggregate([
          {
            $project: {
              oficina: {
                $concatArrays: [
                    [{ $ifNull: ["$origen.ID", null] }], 
                    [{ $ifNull: ["$destino.ID", null] }] 
                ],
              }
            }
          },
          { 
            $unwind: "$oficina" 
          }, 
          {
            $group: {
              _id: "$oficina",
              oficina: { $first: "$oficina" }
            }
          },
          {
            $project: {
              _id: 0,
              oficina: "$_id"
            },
          },
        ]); */

        const oficinas = await todo.aggregate([
            {$unwind: {path: "$origen"}},
            {$group: {
                _id: "$origen.ID",
                origen: { $first: "$origen" } 
              }},
            {$project: {
                _id: 0,
                origen: 1
              }}
          ]);
        res.status(200).json(oficinas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Q2. Listar los envíos realizados en determinada oficina con estatus en tránsito.
const enviosTransitoEnOficina = async (req, res) => {
    const ID = req.params.id;
    try {
        /* const envios = await todo.find({'origen.ID': ID, 'estatus': 'tránsito'}); */
        const envios = await todo.aggregate([
            {$match: { "origen.ID": ID, "estatus": "tránsito" }},
            {$project: { _id: 0 }}
          ]);
        console.log('enviosTransitoEnOficina respuesta: ', envios);
        res.status(200).json(envios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Q3. Listar los envíos que utilizan un tipo específico de envío.
const enviosMetodoEspecifico = async (req, res) => {
  const tipoDeEnvio = req.params.tipoDeEnvio;
  console.log('enviosMetodoEspecifico, tipoDeEnvio: ', parseInt(tipoDeEnvio));
  try {
    const tipo = await tipoEnvio.findOne({'ID': parseInt(tipoDeEnvio)});
    // const envios = await todo.find({'tipoEnvio': tipo});
    
    const envios = await todo.aggregate([
        {$match: { 'tipoEnvio': tipo._id }},
        {$project: { _id: 0 }}
      ]);
    res.status(200).json(envios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Q4. Listar los envíos realizados por un cliente en específico en todas las oficinas.
const enviosPorCliente = async (req, res) => {
    const cliente = req.params.CURP;
    try {
        const envios = await todo.find({'cliente.CURP': cliente});
        res.status(200).json(envios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Q5. Listar los clientes que han realizado envíos en una determinada oficina.
const clientesEnviosOficina = async (req, res) => {
    const oficina = req.params.id;
    try {
        const clientes = await todo.aggregate([
            {$match: { 'origen.ID': oficina }},
            {$project: { 
                _id: 0,
                'cliente': 1
            }}
          ]);
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Q6. Listar los envíos de todas las oficinas con estatus de entregado.
const oficinasEntregado = async (req, res) => {
  try {
    const envios = await todo.aggregate([
        {$match: { 'estatus': 'entregado' }},
        {$project: { _id: 0 }}
    ]);
    res.status(200).json(envios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.
const clientesEnviosTerrestres = async (req, res) => {
  try {
    const tipo = await tipoEnvio.findOne({'ID': 1});

    console.log('Q7 tipo: ', tipo);
    console.log('Q7 tipo._id: ', tipo._id);

    const clientes = await todo.aggregate([
        {$match: { 'tipoEnvio': tipo._id }},
        {$project: { _id: 0 }}
      ]);
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Q8. Listar los clientes y sus envíos se han remitido por el servicio express considerando una oficina en específico.
const clientesEnviosExpressOficina = async (req, res) => {
  try {
    const oficina = req.params.id
    const tipo = await tipoEnvio.findOne({'ID': 3});

    const clientes = await todo.aggregate([
        {$match: { 'origen.ID': oficina, 'tipoEnvio': tipo._id }},
        {$project: { _id: 0 }}
      ]);
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Meter todos los datos
const meterEnvios = async (req, res) => {
  try {
    const meter = await todo.insertMany([
      //Cliente 1 - Envio 1
      {
          ID: 101,
          fechaEnvio: "2024-01-01T10:00:00Z",
  
          origen: {
              ID: "OF001", 
              nombre: "Oficina Central",
              direccion: {
                  calle: "Avenida de la Reforma",
                  numero: 100,
                  ciudad: "Ciudad de México",
                  CP: 65000
              },
              telefono: 5551234567,
              email: "oficina.central@example.com"
          },
  
          destino:  {
              ID: "OF003", 
              nombre: "Oficina Guadalajara",
              direccion: {
                  calle: "Avenida Vallarta",
                  numero: 3000,
                  ciudad: "Guadalajara",
                  CP: 44130
              },
              telefono: 3331234567,
              email: "oficina.guadalajara@example.com"
          },
  
          tipoEnvio: '674e262b88019990e1eef212',
          cliente: {
              CURP: "GARC910827HDFRSL03",
              nombre: "Carlos",
              apellidos: "García Ramírez",
              email: "carlos.garcia@example.com"
          },
          peso: 10,
          dimensiones:  {
              largo: 50,
              ancho: 40,
              alto: 30
          },
          costoTotal: 250,
          estatus: "pendiente"
      },
  
      //Cliente 1 - Envio 2
      {
          ID: 102,
          fechaEnvio: "2024-01-02T10:00:00Z",
          origen:  {
              ID: "OF004", 
              nombre: "Oficina Mérida",
              direccion:  {
                  calle: "Paseo de Montejo",
                  numero: 200,
                  ciudad: "Mérida",
                  CP: 97000
              },
              telefono: 9991234567,
              email: "oficina.merida@example.com"
              },
  
          //Oficina 2
          destino:  {
              ID: "OF002", 
              nombre: "Oficina Monterrey",
              direccion:  {
                  calle: "Calle Morelos",
                  numero: 450,
                  ciudad: "Monterrey",
                  CP: 64000
              },
              telefono: 8181234567,
              email: "oficina.monterrey@example.com"
              },
  
          tipoEnvio: '674e262b88019990e1eef212',
          cliente:  {
              CURP: "GARC910827HDFRSL03",
              nombre: "Carlos",
              apellidos: "García Ramírez",
              email: "carlos.garcia@example.com}"
          },
          peso: 20,
          dimensiones:  {
              largo: 40,
              ancho: 30,
              alto: 50
          },
          costoTotal: 250,
          estatus: "tránsito"
      },
  
      //Cliente 1 - Envio 3
      {
          ID: 103,
          fechaEnvio: "2024-01-03T10:00:00Z",
          origen:  {
              ID: "OF002", 
              nombre: "Oficina Monterrey",
              direccion:  {
                  calle: "Calle Morelos",
                  numero: 450,
                  ciudad: "Monterrey",
                  CP: 64000
              },
              telefono: 8181234567,
              email: "oficina.monterrey@example.com"
          },
  
          destino:  {
              ID: "OF005", 
              nombre: "Oficina Cancún",
              direccion:  {
                      calle: "Boulevard Kukulcán",
                      numero: 150,
                      ciudad: "Cancún",
                      CP: 77500
                  },
                  telefono: 9981234567,
                  email: "oficina.cancun@example.com"
              },
  
          tipoEnvio: '674e262b88019990e1eef212',
          cliente:  {
              CURP: "GARC910827HDFRSL03",
              nombre: "Carlos",
              apellidos: "García Ramírez",
              email: "carlos.garcia@example.com"
          },
          peso: 30,
          dimensiones:  {
              largo: 30,
              ancho: 50,
              alto: 40
          },
          costoTotal: 250,
          estatus: "entregado"
      },
  
      //Cliente 2 - Envio 1
      {
          ID: 201,
          fechaEnvio: "2024-02-01T10:00:00Z",
  
          origen:  {
              ID: "OF005", 
              nombre: "Oficina Cancún",
              direccion:  {
                  calle: "Boulevard Kukulcán",
                  numero: 150,
                  ciudad: "Cancún",
                  CP: 77500
              },
              telefono: 9981234567,
              email: "oficina.cancun@example.com"
          },
  
          destino:  {
              ID: "OF001", 
              nombre: "Oficina Central",
              direccion:  {
                      calle: "Avenida de la Reforma",
                      numero: 100,
                      ciudad: "Ciudad de México",
                      CP: 65000
                  },
                  telefono: 5551234567,
                  email: "oficina.central@example.com"
          },
  
          tipoEnvio: '674e262b88019990e1eef213',
          cliente:  {
                  CURP: "LOPR920113MDFNGR05",
                  nombre: "María",
                  apellidos: "López Rodríguez",
                  email: "maria.lopez@example.com"
              },
          peso: 5,
          dimensiones:  {
              largo: 10,
              ancho: 10,
              alto: 10
          },
          costoTotal: 250,
          estatus: "pendiente"
      },
      
      //Cliente 2 - Envio 2
      {
          ID: 202,
          fechaEnvio: "2024-02-02T10:00:00Z",
  
          origen:  {
              ID: "OF002", 
              nombre: "Oficina Monterrey",
              direccion:  {
                  calle: "Calle Morelos",
                  numero: 450,
                  ciudad: "Monterrey",
                  CP: 64000
              },
              telefono: 8181234567,
              email: "oficina.monterrey@example.com"
          },
  
          destino:  {
              ID: "OF003", 
              nombre: "Oficina Guadalajara",
              direccion:  {
                  calle: "Avenida Vallarta",
                  numero: 3000,
                  ciudad: "Guadalajara",
                  CP: 44130
              },
              telefono: 3331234567,
              email: "oficina.guadalajara@example.com"
          },
          tipoEnvio: '674e262b88019990e1eef213',
          cliente:  {
              CURP: "LOPR920113MDFNGR05",
              nombre: "María",
              apellidos: "López Rodríguez",
              email: "maria.lopez@example.com"
          },
          peso: 20,
          dimensiones:  {
              largo: 20,
              ancho: 20,
              alto: 20
          },
          costoTotal: 300,
          estatus: "tránsito"
      },
  
      //Cliente 2 - Envio 3
      {
          ID: 203,
          fechaEnvio: "2024-02-03T10:00:00Z",
          
          origen:  {
              ID: "OF003", 
              nombre: "Oficina Guadalajara",
              direccion:  {
                  calle: "Avenida Vallarta",
                  numero: 3000,
                  ciudad: "Guadalajara",
                  CP: 44130
              },
              telefono: 3331234567,
              email: "oficina.guadalajara@example.com"
          },
          
          destino:  {
              ID: "OF004", 
              nombre: "Oficina Mérida",
              direccion:  {
                  calle: "Paseo de Montejo",
                  numero: 200,
                  ciudad: "Mérida",
                  CP: 97000
              },
              telefono: 9991234567,
              email: "oficina.merida@example.com"
          },
              
          tipoEnvio: '674e262b88019990e1eef213',
          cliente:  {
              CURP: "LOPR920113MDFNGR05",
              nombre: "María",
              apellidos: "López Rodríguez",
              email: "maria.lopez@example.com"
          },
          peso: 30,
          dimensiones:  {
              largo: 30,
              ancho: 30,
              alto: 30
          },
          costoTotal: 350,
          estatus: "entregado"
      },
  
      //Cliente 3 - Envio 1
      {
          ID: 301,
          fechaEnvio: "2024-03-01T10:00:00Z",
          origen:  {
              ID: "OF003", 
              nombre: "Oficina Guadalajara",
              direccion:  {
                  calle: "Avenida Vallarta",
                  numero: 3000,
                  ciudad: "Guadalajara",
                  CP: 44130
              },
              telefono: 3331234567,
              email: "oficina.guadalajara@example.com"
          },
  
          destino:  {
              ID: "OF002", 
              nombre: "Oficina Monterrey",
              direccion:  {
                  calle: "Calle Morelos",
                  numero: 450,
                  ciudad: "Monterrey",
                  CP: 64000
              },
              telefono: 8181234567,
              email: "oficina.monterrey@example.com"
          },
  
          tipoEnvio: '674e262b88019990e1eef214',
          cliente:  {
              CURP: "FERJ830506HGRLZN08",
              nombre: "Juan",
              apellidos: "Fernández Lázaro",
              email: "juan.fernandez@example.com"
          },
          peso: 123,
          dimensiones:  {
              largo: 12,
              ancho: 23,
              alto: 34
          },
          costoTotal: 321,
          estatus: "pendiente"
      },
  
      //Cliente 3 - Envio 2
      {
          ID: 302,
          fechaEnvio: "2024-03-02T10:00:00Z",
  
          origen:  {
              ID: "OF004", 
              nombre: "Oficina Mérida",
              direccion:  {
                  calle: "Paseo de Montejo",
                  numero: 200,
                  ciudad: "Mérida",
                  CP: 97000
              },
              telefono: 9991234567,
              email: "oficina.merida@example.com"
          },
  
          destino:  {
              ID: "OF005", 
              nombre: "Oficina Cancún",
              direccion:  {
                  calle: "Boulevard Kukulcán",
                  numero: 150,
                  ciudad: "Cancún",
                  CP: 77500
              },
              telefono: 9981234567,
              email: "oficina.cancun@example.com"
          },
  
          tipoEnvio: '674e262b88019990e1eef214',
          cliente:  {
              CURP: "FERJ830506HGRLZN08",
              nombre: "Juan",
              apellidos: "Fernández Lázaro",
              email: "juan.fernandez@example.com"
          },
          peso: 456,
          dimensiones:  {
              largo: 45,
              ancho: 56,
              alto: 67
          },
          costoTotal: 654,
          estatus: "tránsito"
      },
  
      //Cliente 3 - Envio 3
      {
          ID: 303,
          fechaEnvio: "2024-03-03T10:00:00Z",
          origen:  {
              ID: "OF001", 
              nombre: "Oficina Central",
              direccion:  {
                  calle: "Avenida de la Reforma",
                  numero: 100,
                  ciudad: "Ciudad de México",
                  CP: 65000
              },
              telefono: 5551234567,
              email: "oficina.central@example.com"
          },
  
          destino:  {
              ID: "OF003", 
              nombre: "Oficina Guadalajara",
              direccion:  {
                  calle: "Avenida Vallarta",
                  numero: 3000,
                  ciudad: "Guadalajara",
                  CP: 44130
              },
              telefono: 3331234567,
              email: "oficina.guadalajara@example.com"
          },
  
          tipoEnvio: '674e262b88019990e1eef214',
          cliente:  {
              CURP: "FERJ830506HGRLZN08",
              nombre: "Juan",
              apellidos: "Fernández Lázaro",
              email: "juan.fernandez@example.com"
          },
          peso: 789,
          dimensiones:  {
              largo: 78,
              ancho: 89,
              alto: 90
          },
          costoTotal: 987,
          estatus: "entregado"
      },
  
      //Cliente 4 - Envio 1
      {
          ID: 401,
          fechaEnvio: "2024-04-01T10:00:00Z",
          origen:  {
              ID: "OF002", 
              nombre: "Oficina Monterrey",
              direccion:  {
                  calle: "Calle Morelos",
                  numero: 450,
                  ciudad: "Monterrey",
                  CP: 64000
              },
              telefono: 8181234567,
              email: "oficina.monterrey@example.com"
          },
  
          destino:  {
              ID: "OF003", 
              nombre: "Oficina Guadalajara",
              direccion:  {
                  calle: "Avenida Vallarta",
                  numero: 3000,
                  ciudad: "Guadalajara",
                  CP: 44130
              },
              telefono: 3331234567,
              email: "oficina.guadalajara@example.com"
          },
          
          tipoEnvio: '674e262b88019990e1eef212',
          cliente:  {
              CURP: "SANC940215MMNGRB04",
              nombre: "Ana",
              apellidos: "Sánchez Robles",
              email: "ana.sanchez@example.com"
          },
          peso: 141,
          dimensiones:  {
              largo: 14,
              ancho: 41,
              alto: 40
          },
          costoTotal: 5146,
          estatus: "pendiente"
      },
  
      //Cliente 4 - Envio 2
      {
          ID: 402,
          fechaEnvio: "2024-04-02T10:00:00Z",
          origen:  {
              ID: "OF001", 
              nombre: "Oficina Central",
              direccion:  {
                  calle: "Avenida de la Reforma",
                  numero: 100,
                  ciudad: "Ciudad de México",
                  CP: 65000
              },
              telefono: 5551234567,
              email: "oficina.central@example.com"
          },
  
          destino:  {
              ID: "OF005", 
              nombre: "Oficina Cancún",
              direccion:  {
                  calle: "Boulevard Kukulcán",
                  numero: 150,
                  ciudad: "Cancún",
                  CP: 77500
              },
              telefono: 9981234567,
              email: "oficina.cancun@example.com"
          },
  
          tipoEnvio: '674e262b88019990e1eef213',
          cliente:  {
              CURP: "SANC940215MMNGRB04",
              nombre: "Ana",
              apellidos: "Sánchez Robles",
              email: "ana.sanchez@example.com"
          },
          peso: 142,
          dimensiones:  {
              largo: 24,
              ancho: 42,
              alto: 41
          },
          costoTotal: 1264,
          estatus: "tránsito"
      },
  
      //Cliente 4 - Envio 3
      {
          ID: 403,
          fechaEnvio: "2024-04-03T10:00:00Z",
          origen:  {
              ID: "OF005", 
              nombre: "Oficina Cancún",
              direccion:  {
                  calle: "Boulevard Kukulcán",
                  numero: 150,
                  ciudad: "Cancún",
                  CP: 77500
              },
              telefono: 9981234567,
              email: "oficina.cancun@example.com"
          },
  
          destino:  {
              ID: "OF002", 
              nombre: "Oficina Monterrey",
              direccion:  {
                  calle: "Calle Morelos",
                  numero: 450,
                  ciudad: "Monterrey",
                  CP: 64000
              },
              telefono: 8181234567,
              email: "oficina.monterrey@example.com"
          },
  
          tipoEnvio: '674e262b88019990e1eef214',
          cliente:  {
              CURP: "SANC940215MMNGRB04",
              nombre: "Ana",
              apellidos: "Sánchez Robles",
              email: "ana.sanchez@example.com"
          },
          peso: 143,
          dimensiones:  {
              largo: 34,
              ancho: 43,
              alto: 42
          },
          costoTotal: 3256,
          estatus: "entregado"
      },
  
      //Cliente 5 - Envio 1
      {
          ID: 501,
          fechaEnvio: "2024-05-01T10:00:00Z",
          origen:  {
              ID: "OF004", 
              nombre: "Oficina Mérida",
              direccion:  {
                      calle: "Paseo de Montejo",
                      numero: 200,
                      ciudad: "Mérida",
                      CP: 97000
                  },
                  telefono: 9991234567,
                  email: "oficina.merida@example.com"
              },
  
          destino:  {
              ID: "OF001", nombre: "Oficina Central",
              direccion:  {
                      calle: "Avenida de la Reforma",
                      numero: 100,
                      ciudad: "Ciudad de México",
                      CP: 65000
                  },
                  telefono: 5551234567,
                  email: "oficina.central@example.com"
              },
  
          tipoEnvio: '674e262b88019990e1eef214',
          cliente:  {
              CURP: "MRTL870909HJCRMN02",
              nombre: "Luis",
              apellidos: "Martínez Cruz",
              email: "luis.martinez@example.com"
          },
          peso: 145,
          dimensiones:  {
              largo: 65,
              ancho: 76,
              alto: 87
          },
          costoTotal: 6824,
          estatus: "pendiente"
      },
  
      //Cliente 5 - Envio 2
      {
          ID: 502,
          fechaEnvio: "2024-05-02T10:00:00Z",
          origen:  {
              ID: "OF005", nombre: "Oficina Cancún",
              direccion:  {
                      calle: "Boulevard Kukulcán",
                      numero: 150,
                      ciudad: "Cancún",
                      CP: 77500
                  },
                  telefono: 9981234567,
                  email: "oficina.cancun@example.com"
              },
  
          destino:  {
              ID: "OF001", 
              nombre: "Oficina Central",
              direccion:  {
                      calle: "Avenida de la Reforma",
                      numero: 100,
                      ciudad: "Ciudad de México",
                      CP: 65000
                  },
                  telefono: 5551234567,
                  email: "oficina.central@example.com"
              },
  
          tipoEnvio: '674e262b88019990e1eef213',
          cliente:  {
              CURP: "MRTL870909HJCRMN02",
              nombre: "Luis",
              apellidos: "Martínez Cruz",
              email: "luis.martinez@example.com"
          },
          peso: 245,
          dimensiones:  {
              largo: 85,
              ancho: 96,
              alto: 107
          },
          costoTotal: 3674,
          estatus: "entregado"
      },
  
      //Cliente 5 - Envio 3
      {
          ID: 503,
          fechaEnvio: "2024-05-03T10:00:00Z",
          origen:  {
              ID: "OF001", 
              nombre: "Oficina Central",
              direccion:  {
                      calle: "Avenida de la Reforma",
                      numero: 100,
                      ciudad: "Ciudad de México",
                      CP: 65000
                  },
                  telefono: 5551234567,
                  email: "oficina.central@example.com"
              },
  
          destino:  {
              ID: "OF004", 
              nombre: "Oficina Mérida",
              direccion:  {
                      calle: "Paseo de Montejo",
                      numero: 200,
                      ciudad: "Mérida",
                      CP: 97000
                  },
                  telefono: 9991234567,
                  email: "oficina.merida@example.com"
              },
  
          tipoEnvio: '674e262b88019990e1eef212',
          cliente:  {
              CURP: "MRTL870909HJCRMN02",
              nombre: "Luis",
              apellidos: "Martínez Cruz",
              email: "luis.martinez@example.com"
          },
          peso: 345,
          dimensiones: 
          {
              largo: 95,
              ancho: 106,
              alto: 117
          },
          costoTotal: 7184,
          estatus: "tránsito"
      },
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

module.exports = {
    obtenerTodasOficinas, enviosTransitoEnOficina,
    enviosMetodoEspecifico, enviosPorCliente,
    clientesEnviosOficina, oficinasEntregado,
    clientesEnviosTerrestres, clientesEnviosExpressOficina, meterEnvios
}
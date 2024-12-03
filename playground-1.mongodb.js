// Q0. Crear el escenario de datos con la correspondiente integridad referencial en un único archivo. La ejecución de dicho archivo debe insertar la totalidad de datos en las correspondientes instancias.
use('Paqueteria');

/* 
db.getCollection('tipoEnvio').insertMany([
    {
        ID: 1,
        desc: "terrestre",
        precioKM: 10,
        tiempoEntrega: "1 SEMANA"
    },
    {
        ID: 2,
        desc: "aéreo",
        precioKM: 20,
        tiempoEntrega: "4 DIAS"
    },
    {
        ID: 3,
        desc: "express",
        precioKM: 35,
        tiempoEntrega: "1 DIA"
    }
]);

db.getCollection('envio').insertMany([
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

        tipoEnvio: 1,
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

        tipoEnvio: 1,
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

        tipoEnvio: 1,
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

        tipoEnvio: 2,
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
        tipoEnvio: 2,
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
            
        tipoEnvio: 2,
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

        tipoEnvio: 3,
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

        tipoEnvio: 3,
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

        tipoEnvio: 3,
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
        
        tipoEnvio: 1,
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

        tipoEnvio: 2,
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

        tipoEnvio: 3,
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

        tipoEnvio: 3,
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

        tipoEnvio: 2,
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

        tipoEnvio: 1,
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
 */

// Q1. Listar los datos de todas las oficinas
/* db.getCollection('envio').aggregate([
    {$unwind: {path: "$origen"}},
    {$group: {
        _id: "$origen.ID",
        origen: { $first: "$origen" } 
      }},
    {$project: {
        _id: 0,
        origen: 1
      }}
  ]); */
  

// Q2. Listar los envíos realizados en determinada oficina con estatus en tránsito.
//db.getCollection('envio').find({'origen': 'OF001', 'estatus': 'tránsito'});
/* db.getCollection('envio').aggregate([
    {$match: { "origen.ID": "OF001", "estatus": "tránsito" }},
    {$project: { _id: 0 }}
  ]); */

// Q3. Listar los envíos que utilizan un tipo específico de envío.
// db.getCollection('envio').find({'tipoEnvio': 1});
/* db.getCollection('envio').aggregate([
    {$match: { 'tipoEnvio': 1 }},
    {$project: { _id: 0 }}
  ]); */

// Q4. Listar los envíos realizados por un cliente en específico en todas las oficinas.
/* db.getCollection('envio').aggregate([
    {$match: { 'cliente.CURP': 'GARC910827HDFRSL03' }},
    {$project: { _id: 0 }}
  ]); */

// Q5. Listar los clientes que han realizado envíos en una determinada oficina.
/* db.getCollection('envio').aggregate([
    {$match: { 'origen.ID': 'OF001' }},
    {$project: { 
        _id: 0,
        'cliente': 1
    }}
  ]); */

// Q6. Listar los envíos de todas las oficinas con estatus de entregado.
// db.getCollection('envio').find({ 'estatus': 'entregado'}, { '_id': 0});
/* db.getCollection('envio').aggregate([
    {$match: { 'estatus': 'entregado' }},
    {$project: { _id: 0 }}
  ]); */

// Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.
/* db.getCollection('envio').aggregate([
    {$match: { 'tipoEnvio': 1 }},
    {$project: { _id: 0 }}
  ]); */

// Q8. Listar los clientes y sus envíos se han remitido por el servicio express considerando una oficina en específico.
/* db.getCollection('envio').aggregate([
    {$match: { 'origen.ID': 'OF004', 'tipoEnvio': 3 }},
    {$project: { _id: 0 }}
  ]); */

                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
/*                                                                                                     
                                                ...........................                         
                                             ...............:::..............                       
                                            ...........:::::::::::::............                    
                                        ..........:==-:::::::::::::::::............                 
                                        ..........==:::::::::::::::::::++:..........                
                                       ...........::::::::::::::::::::::-:...........               
                                      ............::::::*+:..-:.::=::::::..............             
                                      ............:::-::::.*%%%#.:-::::::..............             
                                    ..............:---::....+#*:.::::::::.:-:...........            
                                    ...........::.::::.....-=#=-...::::=-:..............            
                                    ...:........:===::..............::::.:::.....::.....            
                                  ....::.....:========:.............::...........:......            
                                .....::...:-=============-::...::--===-.........:......             
                            .......::....:======+++===----=============:........:......             
                          .......::.....-=============+------===========:............               
                         ...............==============++-===+++++=======-............               
                     .................:-=+===========++==++=============-...........                
                   ..................:=====+++++=======-=++=============-..........                 
                  ..............:+*=-==========----------===============-..........                 
                 .............:++++++==========-----------==============.........                   
               ..............-+++++++===========----------==+++=======-:.........                   
              ..............:++++++++==============----==========+++=:...........                   
              ..............+++++++++====================+++========-............                   
             ..............-+++++++++==================+++++=======-.............                   
             ..............=+++++++++================++++++++======:......:......                   
             ..............+++++++++================+++++++++====-........:.....                    
             ..............+++++++++===============++++++++++===-........:......                    
             ..............=++++++++==============++++++++++===:........::......                    
             ..............-+++++++==============+++++++++++=-.........::.......                    
             ...............:++++++=============+*+++++++++=:..........:.......                     
              ................:-::......:-=====++++++++++=:....................                     
               ............................:-==+++++++++:....................                       
                  ............................:+++++++-.....................                        
                   .............................:--::...........::..........                        
                      .....................::................:::...........                         
                               ..............:::...........::...........                            
                                    ............:::::::::::............                             
                                          .........................                                 
                                            ...................                                     
                                               ...........                                                                                                                                
 */
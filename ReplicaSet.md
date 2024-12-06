## [Link a Github](https://github.com/edjovilellaca/Escenario_Paqueteria_en_MongoDB-NOSQL_2024.git)

# Caso 01 - Empresa de Paquetería (Envíos)

La empresa de paquetería opera utilizando bases de datos no relacionales (MongoDB) para gestionar su operación. A continuación, se describe el escenario de datos, el funcionamiento de las colecciones, y cómo ejecutar consultas específicas (queries) sobre estas colecciones.

---

## **Estructura de las colecciones**
En MongoDB, las colecciones son similares a las tablas en bases de datos relacionales. Contienen documentos en formato JSON que representan entidades individuales. Para este caso, se tienen dos colecciones principales:

### **1. `tipoEnvio`**
Esta colección almacena los tipos de envío disponibles, incluyendo su descripción, precio por kilómetro y tiempo estimado de entrega.

**Ejemplo de documentos:**
```json
{
    "ID": 1,
    "desc": "terrestre",
    "precioKM": 10,
    "tiempoEntrega": "1 SEMANA"
},
{
    "ID": 2,
    "desc": "aéreo",
    "precioKM": 20,
    "tiempoEntrega": "4 DIAS"
}
```

### **2. `envio`**
Esta colección contiene los detalles de los envíos realizados por la empresa, incluyendo información sobre el origen, el cliente, el tipo de envío utilizado y el estado del envío.

**Ejemplo de un documento:**
```json
{
    "ID": 101,
    "fechaEnvio": "2024-01-01T10:00:00Z",
    "origen": {
        "ID": "OF001",
        "nombre": "Oficina Central",
        "direccion": {
            "calle": "Avenida de la Reforma",
            "numero": 100,
            "ciudad": "Ciudad de México",
            "CP": 65000
        },
        "telefono": 5551234567,
        "email": "oficina.central@example.com"
    },
    "destino": {
        "ID": "OF002",
        "nombre": "Sucursal Guadalajara",
        "direccion": {
            "calle": "Calle Hidalgo",
            "numero": 50,
            "ciudad": "Guadalajara",
            "CP": 44100
        },
        "telefono": 5557654321,
        "email": "sucursal.gdl@example.com"
    },
    "cliente": {
        "CURP": "GARC910827HDFRSL03",
        "nombre": "Carlos García",
        "telefono": 5512345678,
        "email": "carlos.garcia@example.com"
    },
    "tipoEnvio": 1,
    "estatus": "tránsito"
}
```

---

## **Consultas sobre las colecciones**
A continuación, se presentan ejemplos de queries para obtener datos de estas colecciones:

### **Q1: Listar los datos de todas las oficinas**
Consulta todas las oficinas involucradas en los envíos.  
```javascript
db.getCollection('envio').aggregate([
    { $unwind: { path: "$origen" } },
    { $group: { _id: "$origen.ID", origen: { $first: "$origen" } } },
    { $project: { _id: 0, origen: 1 } }
]);
```

### **Q2: Listar los envíos realizados en determinada oficina con estatus en tránsito**
Muestra los envíos de una oficina específica (`OF001`) con estatus "tránsito".
```javascript
db.getCollection('envio').aggregate([
    { $match: { "origen.ID": "OF001", "estatus": "tránsito" } },
    { $project: { _id: 0 } }
]);
```

### **Q3: Listar los envíos que utilizan un tipo específico de envío**
Encuentra los envíos que utilizan el servicio terrestre (`tipoEnvio: 1`).
```javascript
db.getCollection('envio').aggregate([
    { $match: { "tipoEnvio": 1 } },
    { $project: { _id: 0 } }
]);
```

### **Q4: Listar los envíos realizados por un cliente específico**
Filtra los envíos realizados por el cliente con CURP `GARC910827HDFRSL03`.
```javascript
db.getCollection('envio').aggregate([
    { $match: { "cliente.CURP": "GARC910827HDFRSL03" } },
    { $project: { _id: 0 } }
]);
```

### **Q5: Listar los clientes que han realizado envíos en una determinada oficina**
Lista los clientes que enviaron paquetes desde la oficina `OF001`.
```javascript
db.getCollection('envio').aggregate([
    { $match: { "origen.ID": "OF001" } },
    { $project: { _id: 0, cliente: 1 } }
]);
```

### **Q6: Listar los envíos de todas las oficinas con estatus de entregado**
Consulta todos los envíos que tienen estatus "entregado".
```javascript
db.getCollection('envio').aggregate([
    { $match: { "estatus": "entregado" } },
    { $project: { _id: 0 } }
]);
```

### **Q7: Listar los clientes y sus envíos remitidos por el servicio terrestre**
Filtra envíos realizados por el servicio terrestre (`tipoEnvio: 1`).
```javascript
db.getCollection('envio').aggregate([
    { $match: { "tipoEnvio": 1 } },
    { $project: { _id: 0 } }
]);
```

### **Q8: Listar los clientes y sus envíos por el servicio express desde una oficina específica**
Consulta envíos express (`tipoEnvio: 3`) desde la oficina `OF004`.
```javascript
db.getCollection('envio').aggregate([
    { $match: { "origen.ID": "OF004", "tipoEnvio": 3 } },
    { $project: { _id: 0 } }
]);
```

---

## **Explicación técnica**
### **Cómo funcionan las colecciones**
- **Almacenamiento flexible**: Las colecciones permiten almacenar documentos JSON con esquemas no estrictos, lo que facilita la inclusión de campos adicionales sin modificar la estructura general.
- **Índices**: MongoDB usa índices para acelerar las consultas sobre campos comunes como `ID`, `estatus`, o `tipoEnvio`.

### **Cómo funcionan los queries**
- **`find()`**: Filtra documentos basándose en condiciones específicas.
- **`aggregate()`**: Permite realizar operaciones avanzadas, como agrupaciones (`$group`), proyecciones (`$project`), y filtros (`$match`).
- **Operadores**: MongoDB incluye operadores para trabajar con datos, como `$unwind` para descomponer arreglos o `$group` para agrupar resultados.

---

### **docker-compose.yml**
Este archivo configura la infraestructura para una aplicación con múltiples servicios que interactúan entre sí: la aplicación principal, MongoDB, y Redis.

1. **Servicios principales:**
   - **`app01`:**
     - La aplicación Node.js.
     - Se conecta a MongoDB mediante `MONGO_URI` y a Redis mediante `REDIS_HOST` y `REDIS_PORT`.
     - Depende de los servicios `mongo01` (MongoDB principal) y `redis01` (Redis).
   - **`redis01`:**
     - Usa Redis Stack, que incluye Redis y características adicionales como una interfaz web.
     - Expone puertos estándar para Redis (`6379`) y su interfaz gráfica (`8001`).

2. **MongoDB Replica Set:**
   - **¿Qué es un Replica Set?**
     - Un conjunto de réplicas es un grupo de procesos de MongoDB que mantienen el mismo conjunto de datos. Esto asegura disponibilidad y redundancia. Si el nodo principal falla, uno de los secundarios se convierte en principal automáticamente.
   - **Configuración:**
     - `mongo01` es el nodo principal.
     - Tres secundarios (`mongo-secondary1`, `mongo-secondary2`, `mongo-secondary3`) están configurados para replicar los datos del nodo principal.
     - El **comando de arranque** (`mongod --replSet replica01`) inicializa cada nodo como parte del replicaset `replica01`.
   - **Healthcheck:**
     - Se usa un script en el nodo `mongo01` para verificar si el replicaset está iniciado:
       ```bash
       rs.status() 
       ```
       Si no lo está, lo inicializa con la configuración especificada:
       ```json
       {
         _id: 'replica01',
         members: [
           { _id: 0, host: 'mongo01:27017', priority: 1 },
           { _id: 1, host: 'mongo-secondary1:27017', priority: 0.5 },
           { _id: 2, host: 'mongo-secondary2:27017', priority: 0.5 },
           { _id: 3, host: 'mongo-secondary3:27017', priority: 0.5 }
         ]
       }
       ```

3. **Red:**
   - Todos los servicios están conectados a una red interna (`red01`) para comunicarse entre sí de forma segura.

---

### **Dockerfile**
Configura el entorno para construir y ejecutar la aplicación Node.js.

1. **Imagen base:** Usa una imagen oficial de Node.js para garantizar compatibilidad.
2. **Instalación de dependencias:** Usa `npm install` para instalar las dependencias listadas en `package.json`.
3. **Inicio de la aplicación:** Inicia la aplicación con `node src/server.js`.

---

### **.dockerignore**
Archivos que no se incluyen en la construcción de la imagen Docker:

1. **`node_modules`:** Las dependencias se reinstalan dentro del contenedor, por lo que no se necesitan las versiones locales.
2. **Archivos sensibles:** `.env` (contiene credenciales y configuraciones).
3. **Archivos de registro:** Evita incluir archivos de logs innecesarios como `*.log`.

---

### **Replica Set en MongoDB**
Un **replica set** de MongoDB se utiliza para:
- **Alta disponibilidad:** Garantiza que siempre haya un nodo accesible incluso si el principal falla.
- **Redundancia:** Mantiene copias exactas de los datos en múltiples nodos.
- **Lectura distribuida:** Permite que las aplicaciones lean datos de los nodos secundarios para distribuir la carga.

En este caso:
- El replicaset está identificado como `replica01`.
- `mongo01` actúa como el nodo principal con prioridad más alta.
- Los secundarios (`mongo-secondary1`, `mongo-secondary2`, `mongo-secondary3`) replican los datos y tienen menor prioridad, pero pueden convertirse en principales si el nodo `mongo01` falla.

### **Cómo interactúa la aplicación con el Replica Set**
- El **URI de conexión** en el entorno (`MONGO_URI`) podría configurarse para aprovechar el replicaset:
  ```bash
  MONGO_URI=mongodb://mongo01:27017,mongo-secondary1:27017,mongo-secondary2:27017,mongo-secondary3:27017/paqueteria?replicaSet=replica01
  ```
  Esto indica que la aplicación puede conectarse a cualquier nodo del replicaset para operaciones de lectura y escritura.

---

# Explicación del Código: Sistema de Envíos con MongoDB y Redis

Este sistema utiliza una arquitectura basada en Node.js y MongoDB para manejar datos de una empresa de paquetería. A continuación, se desglosan los componentes del sistema: conexión a bases de datos, manejo de datos en Redis y MongoDB, y controladores para implementar la lógica de negocio.

---

## **Archivo `db.js`: Conexión a las bases de datos**

Este archivo configura y establece conexiones con:
1. **MongoDB**: Base de datos no relacional para almacenar información estructurada como tipos de envío, envíos y datos de clientes.
2. **Redis**: Almacenamiento en memoria utilizado para almacenamiento en caché y procesamiento rápido de consultas.

### **Fragmentos del código explicados:**

1. **Conexión a MongoDB:**
   ```javascript
   mongoose.connect(process.env.MONGO_URI)
   .then(() => {
       console.log('Conectado a MongoDB');
   })
   .catch((error) => {
       console.error('Error al conectar a MongoDB:', error);
   });
   ```
   - **`mongoose.connect`**: Conecta con MongoDB utilizando la URL especificada en `process.env.MONGO_URI` (cargada desde un archivo `.env`).
   - La conexión exitosa imprime un mensaje en la consola; los errores se manejan con `.catch`.

2. **Configuración de Redis:**
   ```javascript
   const redisClient = redis.createClient({
       url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
   });
   ```
   - **Redis Client**: Establece una conexión con el servidor Redis usando credenciales del archivo `.env`.
   - **Eventos**: `redisClient.on('error')` maneja errores y `redisClient.connect()` establece la conexión.

3. **Exportación:**
   ```javascript
   module.exports = { mongoose, redisClient };
   ```
   - Exporta las instancias de conexión para que puedan ser utilizadas en otros archivos.

---

## **Archivo `tipoEnvioController.js`: Controlador para `tipoEnvio`**

Define las funciones para manejar operaciones relacionadas con los tipos de envío.

### **Funciones principales:**

1. **Buscar un tipo de envío por su ID:**
   ```javascript
   const tipoEnvioId = async (req, res) => {
       try {
           const objetoId = req.params;
           const tipoId = await tipoEnvio.find({ _id: objetoId });
           res.status(200).json(tipoId);
       } catch (error) {
           res.status(500).json(error);
       }
   };
   ```
   - Recupera un documento de la colección `tipoEnvio` utilizando su `_id`.

2. **Agregar un nuevo tipo de envío:**
   ```javascript
   const nuevoTipoEnvio = async (req, res) => {
       const respuesta = req.body;
       const tipo = await tipoEnvio.aggregate([
           { $group: { _id: null, maxID: { $max: "$ID" }, maxObjId: { $max: "$_id" } } }
       ]);

       const nuevoID = tipo[0].maxID + 1;
       const incrementedObjId = new mongoose.Types.ObjectId(
           (BigInt("0x" + tipo[0].maxObjId) + BigInt(1)).toString(16).padStart(24, "0")
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
   ```
   - **Paso 1**: Encuentra el ID y `_id` más altos en la colección.
   - **Paso 2**: Incrementa los valores para generar un nuevo `ID` y `_id`.
   - **Paso 3**: Crea un nuevo documento en la colección.

---

## **Archivo `todoController.js`: Controlador para Envíos**

Este archivo contiene funciones relacionadas con los envíos, incluyendo operaciones CRUD y consultas específicas.

### **Funciones principales:**

1. **Listar todas las oficinas (Q1):**
   ```javascript
   const obtenerTodasOficinas = async (req, res) => {
       try {
           const oficinas = await todo.aggregate([
               { $unwind: { path: "$origen" } },
               { $group: { _id: "$origen.ID", origen: { $first: "$origen" } } },
               { $project: { _id: 0, origen: 1 } }
           ]);
           res.status(200).json(oficinas);
       } catch (error) {
           res.status(500).json({ message: error.message });
       }
   };
   ```
   - **`$unwind`**: Descompone documentos que contienen arreglos.
   - **`$group`**: Agrupa documentos por el ID de la oficina origen.
   - **`$project`**: Elimina el campo `_id` del resultado.

2. **Listar envíos en tránsito desde una oficina específica (Q2):**
   ```javascript
   const enviosTransitoEnOficina = async (req, res) => {
       const ID = req.params.id;
       try {
           const envios = await todo.aggregate([
               { $match: { "origen.ID": ID, "estatus": "tránsito" } },
               { $project: { _id: 0 } }
           ]);
           res.status(200).json(envios);
       } catch (error) {
           res.status(500).json({ message: error.message });
       }
   };
   ```
   - **`$match`**: Filtra documentos con el ID de oficina y estatus `tránsito`.

3. **Listar envíos por un tipo de envío específico (Q3):**
   ```javascript
   const enviosMetodoEspecifico = async (req, res) => {
       const tipoDeEnvio = req.params.tipoDeEnvio;
       try {
           const tipo = await tipoEnvio.findOne({ ID: parseInt(tipoDeEnvio) });
           const envios = await todo.aggregate([
               { $match: { tipoEnvio: tipo._id } },
               { $project: { _id: 0 } }
           ]);
           res.status(200).json(envios);
       } catch (error) {
           res.status(500).json({ message: error.message });
       }
   };
   ```

4. **Listar clientes que enviaron paquetes desde una oficina específica (Q5):**
   ```javascript
   const clientesEnviosOficina = async (req, res) => {
       const oficina = req.params.id;
       try {
           const clientes = await todo.aggregate([
               { $match: { "origen.ID": oficina } },
               { $project: { _id: 0, cliente: 1 } }
           ]);
           res.status(200).json(clientes);
       } catch (error) {
           res.status(500).json({ message: error.message });
       }
   };
   ```

### **Exportación:**
```javascript
module.exports = {
    obtenerTodasOficinas, enviosTransitoEnOficina,
    enviosMetodoEspecifico, enviosPorCliente,
    clientesEnviosOficina, oficinasEntregado,
    clientesEnviosTerrestres, clientesEnviosExpressOficina
};
```

---

### **logger.js**
Este archivo implementa un middleware personalizado para registrar los detalles de las solicitudes y respuestas HTTP en Redis.

1. **Configuración de Redis:**
   - Se conecta a un servidor Redis usando las variables de entorno `REDIS_HOST` y `REDIS_PORT`.
   - Maneja errores de conexión a Redis con eventos de error y mensajes en consola.

2. **Sobrescritura de métodos `res.json` y `res.send`:**
   - Sobreescribe los métodos `res.json` y `res.send` para capturar y guardar el cuerpo de la respuesta.

3. **Registro en Redis:**
   - Una vez que la solicitud finaliza (`res.on('finish')`), se crea una clave única basada en el método HTTP, la URL, y la marca de tiempo.
   - Se almacena un objeto que incluye:
     - Información de la solicitud (método, URL, encabezados y cuerpo).
     - Información de la respuesta (código de estado, mensaje y cuerpo).
   - Este registro se guarda en Redis con un tiempo de expiración de 24 horas.

4. **Exportación del middleware:**
   - El middleware se exporta y puede ser usado en otras partes de la aplicación para registrar automáticamente las solicitudes.

---

### **tipoEnvioModel.js**
Define el esquema y el modelo de datos para los tipos de envío en MongoDB usando Mongoose.

1. **Esquema:**
   - `ID`: Número único para identificar el tipo de envío.
   - `desc`: Descripción del tipo de envío (e.g., terrestre, aéreo, express).
   - `precioKM`: Precio por kilómetro para el tipo de envío.
   - `tiempoEntrega`: Tiempo estimado de entrega.

2. **Exportación:**
   - Se exporta como un modelo de Mongoose llamado `tipoEnvio`, que corresponde a una colección en MongoDB.

---

### **todoModel.js**
Define el esquema y el modelo de datos para los envíos (paquetes) en MongoDB usando Mongoose.

1. **Esquema:**
   - Información general:
     - `ID`: Identificador único para el envío.
     - `fechaEnvio`: Fecha en que se realizó el envío.
   - **Origen y destino:**
     - Datos estructurados de la ubicación (ID, nombre, dirección, teléfono y email).
   - **Cliente:**
     - Información del cliente que realizó el envío (CURP, nombre, apellidos, email).
   - **Detalles del envío:**
     - `tipoEnvio`: Referencia al modelo `tipoEnvio` para indicar el tipo de envío.
     - `peso`, `dimensiones` y `costoTotal`: Características del paquete.
     - `estatus`: Estado actual del envío (e.g., "tránsito", "entregado").

2. **Relaciones:**
   - Relación con el modelo `tipoEnvio` a través de la referencia `tipoEnvio`.

3. **Exportación:**
   - Se exporta como un modelo de Mongoose llamado `todo`, que corresponde a una colección en MongoDB.

---

### **todoRoute.js**
Define las rutas para manejar las operaciones relacionadas con envíos (paquetes) y tipos de envío.

1. **Operaciones principales:**
   - **Datos de oficina:**
     - `GET /obtenerTodasOficinas`: Lista todas las oficinas.
   - **Envíos por estatus u oficina:**
     - `GET /enviosTransitoEnOficina/:id`: Lista envíos en tránsito en una oficina específica.
     - `GET /oficinasEntregado`: Lista envíos entregados de todas las oficinas.
   - **Envíos por cliente:**
     - `GET /enviosPorCliente/:CURP`: Lista envíos realizados por un cliente específico.
     - `GET /clientesEnviosOficina/:id`: Lista clientes con envíos en una oficina específica.
   - **Envíos por tipo:**
     - `GET /enviosMetodoEspecifico/:tipoDeEnvio`: Lista envíos que usan un tipo específico de envío.
     - `GET /clientesEnviosTerrestres`: Lista clientes con envíos por servicio terrestre.
     - `GET /clientesEnviosExpressOficina/:id`: Lista clientes con envíos express en una oficina específica.

2. **Creación de datos:**
   - `POST /meterEnvios`: Inserta datos de envíos.
   - `POST /nuevoTipoEnvio`: Inserta un nuevo tipo de envío.

3. **Exportación:**
   - Exporta el objeto `router` que agrupa todas las rutas para integrarse en el servidor.

---

### **server.js**
Archivo principal que inicializa y configura el servidor Express.

1. **Configuración inicial:**
   - Carga las variables de entorno usando `dotenv`.
   - Configura middlewares como `cors`, `morgan`, `bodyParser` y el middleware personalizado `logger`.

2. **Conexión a bases de datos:**
   - Se conecta a MongoDB usando las configuraciones de Mongoose desde `config/db.js`.

3. **Rutas:**
   - Integra las rutas definidas en `todoRoute.js` bajo el prefijo `/api/todo`.

4. **Inicio del servidor:**
   - Inicia el servidor Express en el puerto definido en `process.env.PORT` o el puerto `5000` por defecto.

---

### **docker-compose.yml**
Define la configuración de múltiples servicios para orquestar una aplicación en contenedores usando Docker Compose.

1. **Servicios principales:**
   - **`app01`:**
     - Construye la aplicación desde el directorio actual (`build: .`).
     - Expone el puerto `3000` (mapea el puerto interno del contenedor al externo).
     - Depende de los servicios `mongo01` y `redis01`.
     - Configura variables de entorno para conectarse a MongoDB y Redis.
   - **`mongo01`:**
     - Usa la imagen oficial de MongoDB.
     - Configura un replicaset (`replica01`) para alta disponibilidad.
     - Expone el puerto `27018` para acceso externo.
     - Realiza un **healthcheck** para verificar el estado del replicaset e iniciarlo si es necesario.
   - **`redis01`:**
     - Usa la imagen de Redis Stack.
     - Expone los puertos `6379` (para Redis) y `8001` (para la interfaz gráfica de Redis Stack).

2. **ReplicaSet de MongoDB:**
   - Incluye un nodo principal (`mongo01`) y tres secundarios (`mongo-secondary1`, `mongo-secondary2`, `mongo-secondary3`).
   - Cada nodo secundario tiene configurado el replicaset `replica01` con diferentes niveles de prioridad.
   - Las conexiones se realizan a través de la red interna `red01`.

3. **Red:**
   - Todos los servicios están conectados a una red interna llamada `red01` (tipo `bridge`).

---

### **Dockerfile**
Configura el entorno para construir y ejecutar la aplicación Node.js.

1. **Imagen base:**
   - Usa la imagen oficial de Node.js como base.

2. **Directorio de trabajo:**
   - Establece `/app` como el directorio de trabajo dentro del contenedor.

3. **Instalación de dependencias:**
   - Copia los archivos `package.json` y `package-lock.json`.
   - Ejecuta `npm install` para instalar las dependencias.

4. **Copia de la aplicación:**
   - Copia el resto de los archivos de la aplicación al contenedor.

5. **Exposición del puerto:**
   - Expone el puerto `3000` para permitir conexiones externas.

6. **Inicio de la aplicación:**
   - Ejecuta `node src/server.js` para iniciar el servidor.

---

### **.dockerignore**
Especifica los archivos y directorios que deben ser ignorados al construir la imagen de Docker.

1. **Archivos y carpetas ignorados:**
   - `node_modules`: Evita incluir las dependencias instaladas localmente.
   - Archivos de registro (`*.log`) y de entorno (`.env`): Evita incluir datos sensibles y registros.
   - Archivos relacionados con control de versiones (`.git` y `.gitignore`).

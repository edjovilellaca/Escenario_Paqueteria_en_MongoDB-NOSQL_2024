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

Este enfoque es ideal para aplicaciones como la empresa de paquetería, donde los datos tienen una estructura compleja y las consultas requieren flexibilidad y rapidez.
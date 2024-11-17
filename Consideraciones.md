# Consideraciones
1. Una Oficina puede atender muchos Envíos.
2. Un Cliente puede realizar muchos Envíos
3. Tipo de envío, constituye un “catálogo” que describe los diversos tipos de envíos que maneja la empresa. Un tipo de envío puede ser utilizado en muchos envíos.
4. Un Cliente puede hacer envíos en muchas Oficinas, una Oficina puede atender a muchos Clientes.
Consultas a resolver en el entorno de VSC-Playground. En el caso de las consultas que impliquen dos o más entidades, estructurar un documento de tipo Master(entidad principal) - Detail (entidades secundarias)

Q0. Crear el escenario de datos con la correspondiente integridad referencial en un único archivo. La ejecución de dicho archivo debe insertar la totalidad de datos en las correspondientes instancias.
Q1. Listar los datos de todas las oficinas.
Q2. Listar los envíos realizados en determinada oficina con estatus en tránsito.
Q3. Listar los envíos que utilizan un tipo específico de envío.
Q4. Listar los envíos realizados por un cliente en específico en todas las oficinas.
Q5. Listar los clientes que han realizado envíos en una determinada oficina.
Q6. Listar los envíos de todas las oficinas con estatus de entregado.
Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.
Q8. Listar los clientes y sus envíos se han remitido por el servicio express considerando una oficina en específico.
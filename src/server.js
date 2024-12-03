require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express'); // Framework para construir aplicaciones web y APIs
const cors = require('cors'); // Middleware para permitir solicitudes de recursos cruzados
const morgan = require('morgan'); // Middleware para el registro de solicitudes HTTP
const logger = require('./middleware/logger'); // Middleware personalizado para registrar solicitudes en Redis
const { mongoose, redisClient } = require('./config/db'); // Importamos las configuraciones de MongoDB y Redis
const router = express.Router(); // Módulo de enrutador de Express
const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todoRoute');
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(logger);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.error("Error conectando a la base de datos:", error));

// Rutas
app.use("/api/todo", todoRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
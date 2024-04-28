// src/app.ts
import express from "express";
import sequelize from "./config/config"; // Importar directamente desde el archivo de configuración
import personRoutes from './routes/person.routes';
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configura CORS para permitir todas las solicitudes de cualquier origen
app.use(cors());
app.use(bodyParser.json());
//app.use(express.json());
app.use("/api", personRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}/api');
});

// Conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('Connection to the database has been established successfully.'))
  .catch((err: any) => {
    console.error('Unable to connect to the database: ${err}');
  });
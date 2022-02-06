// Leer el archivo .env
require('dotenv').config();

// Iniciar con nodemon index.js

const express = require('express');
//Aceptar conexiones desde donde queramos
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del BODY
app.use( express.json() );

// Base de datos
dbConnection();

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );




app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );   
} );


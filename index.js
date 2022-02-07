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
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/upload', require('./routes/uploads') );




app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );   
} );


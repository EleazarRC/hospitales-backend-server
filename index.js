// Iniciar con nodemon index.js

const express = require('express');

// Leer el archivo .env
require('dotenv').config();

//Aceptar conexiones desde donde queramos
const cors = require('cors');


const { dbConnection } = require('./database/config');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());


// Base de datos
dbConnection();

// Rutas
app.get( '/', (req, res) => {

    res.json( {
        ok: true,
        msg: 'Hola Mundo'
    });

});



app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );   
} );


// Leer el archivo .env
require('dotenv').config({ path: 'env' });

const path = require('path');

/* console.log('Hola Mundo');
    
console.log(process.env.DATABASE_URL); */

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

// Directorio público
app.use ( express.static('public'));



// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/upload', require('./routes/uploads') );



// Última configuración para que no se pierda la ruta al
// Reiniciar la página
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html'));
});

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );   
} );


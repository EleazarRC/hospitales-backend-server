/*
    ruta: /api/hospitales
*/

/* 
    Ruta: /api/usuarios
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');

const router = Router();


router.get( '/', getHospital );
// El segundo argumento son los middleware (npm i express-validator)
router.post( '/', 
    [
       
    ],
    crearHospital 
);

router.put( '/:id', 
    [
       
    ],
    actualizarHospital );

router.delete( '/:id', borrarHospital );



module.exports = router;
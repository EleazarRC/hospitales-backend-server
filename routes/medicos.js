/*
    ruta: /api/medicos
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');


const router = Router();


router.get( '/', getMedico );
// El segundo argumento son los middleware (npm i express-validator)
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital es necesario').isMongoId(),
        validarCampos
    ],
    crearMedico 
);

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital es necesario').isMongoId(),
        validarCampos

    ],
    actualizarMedico );

router.delete( '/:id', validarJWT, borrarMedico );



module.exports = router;
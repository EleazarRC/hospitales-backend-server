/* 
    Ruta: /api/usuarios
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
const { getUsuarios, crearUsuario , actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const { 

    validarJWT, 
    validadADMIN_ROLE,
    validadADMIN_ROLE_o_MismoUsuario 

} = require("../middlewares/validar-jwt");


router.get( '/', validarJWT, getUsuarios );
// El segundo argumento son los middleware (npm i express-validator)
router.post( '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos  
    ],
    crearUsuario 
);

router.put( '/:id', 
    [
        validarJWT,
        validadADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
actualizarUsuario );

router.delete( '/:id', [validarJWT, validadADMIN_ROLE], borrarUsuario );



module.exports = router;
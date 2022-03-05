const { async } = require("jshint/src/prod-params");
const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario');



const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }


    try {
        
       const { uid } = jwt.verify( token, process.env.JWT_SECRET ); 

       req.uid = uid;
       
       next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }     

};


const validadADMIN_ROLE = async ( req, res, next ) =>  {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );
        console.log(usuarioDB);
            
        
        if( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            });
        }

        if ( usuarioDB.role !== 'ADMIN_ROLE' && uid !== id ){
            return res.status(403).json({
                ok:false,
                msg:'No tiene privilegios para hacer esto'
            });
        }

        next();

        
    } catch (error) {
        console.log(error);
            
        res.status(500).json({
            ok:false,
            msg:'Habla con el administrador'
        });
    }
};

const validadADMIN_ROLE_o_MismoUsuario = async ( req, res, next ) =>  {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );
        console.log(usuarioDB);
            
        
        if( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            });
        }

        if ( usuarioDB.role === 'ADMIN_ROLE' || uid === id  ){

            next();

        } else {

            return res.status(403).json({
                ok:false,
                msg:'No tiene privilegios para hacer esto'
            });
            
        }

        

        
    } catch (error) {
        console.log(error);
            
        res.status(500).json({
            ok:false,
            msg:'Habla con el administrador'
        });
    }
};


module.exports = {
    validarJWT,
    validadADMIN_ROLE,
    validadADMIN_ROLE_o_MismoUsuario
};
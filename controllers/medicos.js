const { response } = require('express');
const Medico = require('../models/medico');

const getMedico = async ( req, res = response ) => {

     // Importante para en vez de mostrar la id mostrar el nombre... 
     const medicos = await Medico.find()        //Tiene que coincidir con el modelo... Schema.Types.ObjectId,        
                                    .populate('usuario', 'nombre')
                                    .populate('hospital', 'nombre');

        res.json( {
        ok: true,
        medicos
        });
};

const crearMedico = async ( req, res = response ) => {

    const uid = req.uid;
    const medico = new Medico({ 
        usuario: uid,
        ...req.body }
        );
        

    try {

        const medicoDB = await medico.save();


        res.json({
            ok: true,
            medico: medicoDB
        });
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const actualizarMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarMedices'
    });

};

const borrarMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'borrarMedices'
    });

};

module.exports =  {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
};
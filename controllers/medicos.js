const { response } = require('express');
const { async } = require('jshint/src/prod-params');
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

const getMedicoById = async ( req, res = response ) => {

    const id = req.params.id;
    
    try {
        
        const medico = await Medico.findById(id)        //Tiene que coincidir con el modelo... Schema.Types.ObjectId,        
                                       .populate('usuario', 'nombre')
                                       .populate('hospital', 'nombre');
    
           res.json( {
           ok: true,
           medico
           });
    } catch (error) {
        console.log(error);
            
        res.json( {
            ok: false,
            msg: 'Hable con el administrador'
            });
    }


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

const actualizarMedico = async( req, res = response ) => {

  
    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById( id );

        if( !medico ) {
            return  res.status(404).json({
                ok: false,
                msg: 'No se encuentra el Medico'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true });


        res.json({
            ok: true,
            medico: medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Habla con el administrador'
        });
    }

};

const borrarMedico = async( req, res = response ) => {

    const id = req.params.id;


    try {

        const medico = await Medico.findById( id );

        if( !medico ) {
            return  res.status(404).json({
                ok: false,
                msg: 'No se encuentra el medico'
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Habla con el administrador'
        });
    }

};

module.exports =  {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
};
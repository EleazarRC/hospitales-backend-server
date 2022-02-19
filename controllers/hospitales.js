const { response } = require('express');
const { async } = require('jshint/src/prod-params');

const Hospital = require('../models/hospital');

const getHospital = async ( req, res = response ) => {

    // Importante para en vez de mostrar la id mostrar el nombre... 
    const hospitales = await Hospital.find()                //Seguir poniendo campos seguido de nombre 'nombre x x x x'
                                        .populate('usuario', 'nombre');

    res.json( {
        ok: true,
        hospitales
    });

};

const crearHospital = async ( req, res = response ) => {

    const uid = req.uid;
    const hospital = new Hospital({ 
        usuario: uid,
        ...req.body });
        

    try {

        const hospitalDB = await hospital.save();


        res.json({
            ok: true,
            hospital: hospitalDB
        });
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
};

const actualizarHospital = async( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById( id );

        if( !hospital ) {
            return  res.status(404).json({
                ok: false,
                msg: 'No se encuentra el Hospital'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true });


        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Habla con el administrador'
        });
    }
};

const borrarHospital = async( req, res = response ) => {
    const id = req.params.id;


    try {

        const hospital = await Hospital.findById( id );

        if( !hospital ) {
            return  res.status(404).json({
                ok: false,
                msg: 'No se encuentra el Hospital'
            });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
};
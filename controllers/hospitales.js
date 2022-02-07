const { response } = require('express');

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

const actualizarHospital = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    });

};

const borrarHospital = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'borrarHospitales'
    });

};

module.exports =  {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
};
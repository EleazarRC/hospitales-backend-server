const { response } = require('express');

const getHospital = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'getHospitales'
    });

};

const crearHospital = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'crearHospitales'
    });

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
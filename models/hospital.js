const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }

}, { collection: 'hospitales'} );

// Opcional para ver uid en vez de _id....
// El password lo extraigo de la respuesta para no mostralo
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model( 'Hospital', HospitalSchema );
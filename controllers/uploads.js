const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const fileUpload = ( req, res = response ) => {

    const tipo  = req.params.tipo;
    const id    = req.params.id;

    // Validar tipo
    const tiposValidos  = ['hospitales', 'medicos', 'usuarios'];
    if( !tiposValidos.includes( tipo ) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
      }

    // Procesar la imagen
    const file = req.files.imagen;
    console.log(file);

    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];
        
    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'JPG', 'jpeg', 'gif'];
      if( !extensionesValidas.includes( extensionArchivo )){
        return res.status(400).json({
            ok: false,
            msg: 'Extensión no permitida'
        });
      }

      // Generar el nombre del archivo
      const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

      // Path para guardar la imagen
      const path = `./uploads/${ tipo }/${ nombreArchivo }`;

       // Use the mv() method to place the file somewhere on your server
        file.mv(path, (err) => {
            if (err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Problema express-fileupload'
                });
            }

            res.json({
                ok: true,
                msg: 'Archivo subido',
                nombreArchivo
            });
        });




};


module.exports = {
    fileUpload
};
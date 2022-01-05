const {response} = require('express');
const bcrypt = require('bcryptjs');
//creo el objeto de acuerdo al modelo
const { generarJWT } = require('../ayudas/jwt');
//-----------------------------------------
const Usuario = require('../modelos/usuario');
const Hospital = require('../modelos/hospital');
const Medico = require('../modelos/medico');


//-----buscar usuarios


const buscar = async(req, res)=>{

    const buscar = req.params.buscar;
    const expreregular = new RegExp(buscar, 'i');

    const [usuarios, hospitales, medicos] = await  Promise.all([
        Usuario.find({nombre: expreregular}),
        Hospital.find({nombre: expreregular}),
        Medico.find({nombre: expreregular}),
    ]);

    //console.log(desde);

       
    res.json({
        ok: true,
        mensaje: 'ver usuarios (get)',
        buscar,
        usuarios,
        hospitales,
        medicos
    })
};


module.exports = {
    buscar
}
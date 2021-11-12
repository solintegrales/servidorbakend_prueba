const {response} = require('express');
//creo el objeto de acuerdo al modelo
const Principal = require('../modelos/principal');
//-----------------------------------------


//-----ver usuarios
const verprincipal = async(req, res)=>{
    const principal = await Principal.find();
    res.json({
        ok: true,
        mensaje: 'ver principal (get)',
        principal
    })
};

//-----crear usuarios
const crearprincipal = async(req, res = response )=>{
    //console.log(req.body);
    //separo los datos
    const {nombre, email} = req.body;
    
    //guardo el usuario
    try {
        const existeemail = await Principal.findOne({email});  
        if(existeemail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }  
        const principal = new Principal(req.body);
        await principal.save();

        res.json({
            ok: true,
            principal
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            alerta: 'error inesperado, revisar los logs'
        })
    }

    
};

module.exports = {
    verprincipal,
    crearprincipal
}
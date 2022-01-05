const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../modelos/usuario');
const { generarJWT } = require('../ayudas/jwt');


//-----login
const login = async(req, res = response )=>{
    
    const {email, clave} = req.body;

    try {

        //valido email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no Existe en los registros'
            }); 
        }

        //verificar clave
        const claveDB = bcrypt.compareSync(clave, usuarioDB.clave);

        if(!claveDB){
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no valida'
            }); 
        }

        //generar JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            //msg: 'Hola',
            token
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            alerta: 'error inesperado, revisar los logs'
        })
    }    
};

const renewtoken = async(req, res =response) =>{

    const uid = req.uid;
    //generar JWT
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    })
}
//-------------------------------------

module.exports = {
    login,
    renewtoken
}
const {response} = require('express');
const bcrypt = require('bcryptjs');
//creo el objeto de acuerdo al modelo
const Usuario = require('../modelos/usuario');
const { generarJWT } = require('../ayudas/jwt');
//-----------------------------------------


//-----ver usuarios
const verusuario = async(req, res)=>{
    const usuario = await Usuario.find();
    res.json({
        ok: true,
        mensaje: 'ver usuarios (get)',
        usuario
    })
};
//-------------------------------------

//-----crear usuarios
const crearusuario = async(req, res = response )=>{
    //console.log(req.body);
    //separo los datos
    const {nombre, email, clave} = req.body;
    
    //guardo el usuario
    try {
        const existeemail = await Usuario.findOne({email});  
        if(existeemail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }  
        const usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.clave = bcrypt.hashSync(clave, salt);

        await usuario.save();

        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
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
//-------------------------------------

//-----editar usuarios
const editarusuario = async(req, res = response )=>{
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontro usuario"
            })
        }

        //Actualizaciones - primero capturo lo que me mandan
        const {clave, google, email, ...campos} = req.body;
        
        if(usuarioDB.email !== email){
            const existeemail = await Usuario.findOne({email});
            if(existeemail){
                return res.status(400).json({
                    ok: false,
                    msg: "El email ya existe"
                })
            }
        }
        campos.email = email;
        const usuarioeditado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
          ok: true,
          msg: "usuario editado",
          usuarioeditado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            alerta: 'error inesperado, revisar los logs'
        })
    }    
};
//--------------------------

//---- borrar usuarios-------
const borrarusuario = async(req, res = response )=>{
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontro usuario"
            })
        }

       
            await Usuario.findByIdAndDelete(uid);
            res.json({
                ok: true,
                msg: "usuario eliminado",
                uid
              })
        
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            alerta: 'error inesperado, revisar los logs'
        })
    }
}

//--------------------------

//-----cambiar estado usuarios
const cambiarestado = async(req, res = response )=>{
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontro usuario"
            })
        }

        //Actualizaciones - primero capturo lo que me mandan
        const campos = req.body;
        
        
        const usuarioeditado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
          ok: true,
          parametro: campos,
          msg: "estado cambiado"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            alerta: 'error inesperado, revisar los logs'
        })
    }    
};
//--------------------------




module.exports = {
    verusuario,
    crearusuario,
    editarusuario,
    borrarusuario,
    cambiarestado
}
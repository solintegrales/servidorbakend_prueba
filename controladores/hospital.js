const {response} = require('express');
const bcrypt = require('bcryptjs');
//creo el objeto de acuerdo al modelo
const { generarJWT } = require('../ayudas/jwt');
const Hospital = require('../modelos/hospital');
//-----------------------------------------


//-----ver hospital
const verhospital = async(req, res)=>{
    const hospital = await Hospital.find()
                                    .populate('ref_usuario', 'nombre email');
    res.json({
        ok: true,
        mensaje: 'ver hopitales (get)',
        hospital: hospital
    })
};
//-------------------------------------

//-----crear hospital
const crearhospital = async(req, res = response )=>{
    
    const uid = req.uid;
    const hospital = new Hospital({
        ref_usuario: uid,
        ...req.body
    });
    
    
    console.log(hospital.ref_usuario);
    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            msg: "Hospitales",
            hospitalDB
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

//-----editar hospitaless
const editarhospital = async(req, res = response )=>{
    //const hid = req.params.id;
    
    try {
        //const hospitalDB = await Hospital.findById(hid);

       /*  if(!hospitalDB){
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
        const usuarioeditado = await Usuario.findByIdAndUpdate(uid, campos, {new: true}); */

        res.json({
          ok: true,
          msg: "usuario editado",
          //usuarioeditado
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

//---- borrar hospital-------
const borrarhospital = async(req, res = response )=>{
    //const hid = req.params.id;
    
    try {
        /* const hospitalDB = await Hospital.findById(hid);
        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontro usuario"
            })
        }

       
            await Hospital.findByIdAndDelete(hid); */
            res.json({
                ok: true,
                msg: "usuario eliminado",
                //uid
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

//-----cambiar estado hopsital
const cambiarestado = async(req, res = response )=>{
    //const hid = req.params.id;
    
    try {
        /* const hospitalDB = await Hospital.findById(hid);

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontro usuario"
            })
        }

        //Actualizaciones - primero capturo lo que me mandan
        const campos = req.body;
        
        
        const hospitaleditado = await Hospital.findByIdAndUpdate(uid, campos, {new: true}); */

        res.json({
          ok: true,
          //parametro: campos,
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
    verhospital,
    crearhospital,
    editarhospital,
    borrarhospital,
    cambiarestado
}
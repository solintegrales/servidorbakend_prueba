const {response} = require('express');
const bcrypt = require('bcryptjs');
//creo el objeto de acuerdo al modelo
const { generarJWT } = require('../ayudas/jwt');
const Medico = require('../modelos/medico');
const Hospital = require('../modelos/hospital');
//-----------------------------------------


//-----ver medico
const vermedico = async(req, res)=>{
    const medico = await Medico.find()
                                .populate('ref_usuario', 'nombre')
                                .populate('ref_hospital', 'nombre');
    res.json({
        ok: true,
        mensaje: 'ver usuarios (get)',
        medico: medico
    })
};
//-------------------------------------

//-----crear medico
const crearmedico = async(req, res = response )=>{
    
    const {ident, ref_hospital} = req.body;
    //console.log(hospital.ref_usuario);
    try {

        const existehospital = await Hospital.findById(ref_hospital);
        const existeident = await Medico.findOne({ident});  
        if(existeident){
            return res.status(400).json({
                ok: false,
                msg: 'La identificación ya esta registrada'
            })
        }
        if(!existehospital){
            return res.status(400).json({
                ok: false,
                msg: 'El id del hospital no existe'
            })
        }  

        const uid = req.uid;
        const medico = new Medico({
            ref_usuario: uid,
            ...req.body
        });

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            msg: "Medico",
            medicoDB
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

//-----editar medico
const editarmedico = async(req, res = response )=>{
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
          msg: "medico editado",
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

//---- borrar medico-------
const borrarmedico = async(req, res = response )=>{
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
                msg: "medico eliminado",
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

//-----cambiar estado medico
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
    vermedico,
    crearmedico,
    editarmedico,
    borrarmedico,
    cambiarestado
}
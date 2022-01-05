const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
//creo el objeto de acuerdo al modelo
const Usuario = require('../modelos/usuario');
const { generarJWT } = require('../ayudas/jwt');
//-----------------------------------------


//-----ver usuarios
const verusuario = async(req, res)=>{

    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    /* const usuario = await Usuario
                                .find()
                                .skip(desde)
                                .limit(5);

    const totalregistros = await Usuario.count(); */

    const [usuario, totalregistros] = await Promise.all([
        Usuario
            .find()
            .skip(desde)
            .limit(5),

            Usuario.count()    
    ]);
    
    res.json({
        ok: true,
        mensaje: 'ver usuarios (get)',
        totalregistros,
        usuario
    })
};
//-------------------------------------

//---------------subir imagen usuario
const subirimg = async(req, res)=>{

    const uid = req.params.uid;

    //------------validar archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No existe archivo"
        });
      }

    //------------------procesar archivo

    const img = req.files.imagen;
    console.log(img);
    const nombrecortado = img.name.split('.');
    const ext = nombrecortado[nombrecortado.length - 1];

    const extvalidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extvalidas.includes(ext)) {
        return res.status(400).json({
            ok: false,
            msg: "Extensión no valida"
        });
      }

    const nombreimg = `${uuidv4()}.${ext}`;
    //path para guargar la imagen
    const path = `./img/usuarios/${nombreimg}`;

    img.mv(path, (err) => {
        if (err){
          console.log(err);
          return res.status(500).json({
              ok: false,
              msg: 'ocurrio un error al mover archivo'
          });
        }
    
          res.json({
            ok: true,
            mensaje: 'Se subio la imagen',
            uid,
            nombreimg
            })
      });
    
    //---------------asigno la imagen al usuario
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontro usuario"
            })
        }
        const {img, ...campos} = req.body;
        campos.img = nombreimg;
        const usuarioeditado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
        /* res.json({
            ok: true,
            msg: "usuario editado",
            usuarioeditado
          }) */

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            alerta: 'error inesperado, revisar los logs'
        }) 
    }
    
};
//--------------------------------------

//-----------buscar usuario
const buscaru = async(req, res)=>{

    const coleccion = req.params.coleccion;
    const dato = req.params.dato;
    //const rcoleccion = new RegExp(coleccion, 'i');
    const rdato = new RegExp(dato, 'i');

    const [usuarios] = await  Promise.all([
        Usuario.find({nombre: rdato}),
    ]);
 
    //console.log(desde);

       
    res.json({
        ok: true,
        mensaje: 'buscar usuarios (get)',
        coleccion,
        usuarios
    })
};

//-------------------

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
    cambiarestado,
    buscaru,
    subirimg
}
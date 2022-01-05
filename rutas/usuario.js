// ruta: /api/usuarios
//-----------------------------

//--------llamo al router
const {Router}=require('express');
const fileUpload = require('express-fileupload');
const {check} = require('express-validator');
const {verusuario, crearusuario, editarusuario, borrarusuario, cambiarestado, buscaru, subirimg}=require('../controladores/usuario');
const { validarJWT } = require('../validaciones/validarjwt');
const {validarcampos}=require('../validaciones/validar_campos');
const router = Router();
//-----------------------

router.use(fileUpload());

//-----ver usuarios
router.get('/', validarJWT, verusuario);
//-----------------------------------

//---------------buscar usuario
//router.get('/:coleccion/:dato', validarJWT, buscaru);
router.get('/usuarios/:dato', validarJWT, buscaru);
//-------------------------

//--------------subir imagen 
router.put('/img/:uid', validarJWT, subirimg);
//-----------------------------

//-----crear usuarios
router.post(
    '/',
    [
        //validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('clave', 'La clave es obligatoria').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        validarcampos,
    ], 
    crearusuario
);
//-------------------------------------

//-----editar usuarios
router.put(
    '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        validarcampos,
    ],
    editarusuario);
//------------------------

//-----cambiar estado
router.patch(
    '/:id', 
    [
        validarJWT,
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        validarcampos,
    ],
    cambiarestado);
//------------------------

//-----borrar usuarios
router.delete(
    '/:id',
    validarJWT, 
    borrarusuario
    );
//------------------------

module.exports =  router;
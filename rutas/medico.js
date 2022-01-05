//-----------------------------

//--------llamo al router
const {Router}=require('express');
const {check} = require('express-validator');
const { vermedico, crearmedico, editarmedico, cambiarestado, borrarmedico } = require('../controladores/medico');
const { validarJWT } = require('../validaciones/validarjwt');
const {validarcampos}=require('../validaciones/validar_campos');
const router = Router();
//-----------------------

//-----ver medico
router.get('/', validarJWT, vermedico);
//-----------------------------------

//-----crear medico
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('ident', 'la identificación es obligatorio').not().isEmpty(),
        check('celular', 'El celular es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('ref_hospital', 'El hospital id debe ser valido').isMongoId(),
        validarcampos,
    ], 
    crearmedico
);
//-------------------------------------

//-----editar medico
router.put(
    '/:id', 
    [],
    editarmedico);
//------------------------

//-----cambiar estado
router.patch(
    '/:id', 
    [],
    cambiarestado);
//------------------------

//-----borrar medico
router.delete(
    '/:id',
    //validarJWT, 
    borrarmedico
    );
//------------------------

module.exports =  router;
//-----------------------------

//--------llamo al router
const {Router}=require('express');
const {check} = require('express-validator');
const { verhospital, crearhospital, editarhospital, cambiarestado, borrarhospital } = require('../controladores/hospital');

const { validarJWT } = require('../validaciones/validarjwt');
const {validarcampos}=require('../validaciones/validar_campos');
const router = Router();
//-----------------------

//-----ver hospital
router.get('/', validarJWT, verhospital);
//-----------------------------------

//-----crear hospital
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La dirección es obligatoria').not().isEmpty(),
        validarcampos,
    ], 
    crearhospital
);
//-------------------------------------

//-----editar hospital
router.put(
    '/:id', 
    [],
    editarhospital);
//------------------------

//-----cambiar estado
router.patch(
    '/:id', 
    [],
    cambiarestado);
//------------------------

//-----borrar hospital
router.delete(
    '/:id',
    //validarJWT, 
    borrarhospital
    );
//------------------------

module.exports =  router;
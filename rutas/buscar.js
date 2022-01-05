//-----------------------------

//--------llamo al router
const {Router}=require('express');
const {check} = require('express-validator');

const {buscar} = require('../controladores/buscar');
const { validarJWT } = require('../validaciones/validarjwt');
const {validarcampos}=require('../validaciones/validar_campos');
const router = Router();
//-----------------------

//-----
router.get('/:buscar', validarJWT, buscar);

//-----------------------------------

module.exports =  router;
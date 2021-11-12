// ruta: /
//-----------------------------

//--------llamo al router
const {Router}=require('express');
const {check} = require('express-validator');
const {verprincipal, crearprincipal}=require('../controladores/principal');
const {validarcampos}=require('../validaciones/validar_campos');
const router = Router();
//-----------------------

//-----ver usuarios
router.get('/', verprincipal);
//-----------------------------------

//-----crear usuarios
router.post(
    '/',
    [
        check('datos', 'Los datos es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        validarcampos,
    ], 
    crearprincipal
);
//-------------------------------------

module.exports =  router;
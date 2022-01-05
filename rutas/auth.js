//--------llamo al router
const { Router }=require('express');
const { check } = require('express-validator');
const { login, renewtoken } = require('../controladores/auth');
const { validarJWT } = require('../validaciones/validarjwt');
const { validarcampos } = require('../validaciones/validar_campos');
const router = Router();

router.post(
    '/',
    [
        check('clave', 'La clave es obligatoria').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        validarcampos
    ],
    login
)

router.get(
    '/renew',
    validarJWT,
    renewtoken  
)


module.exports =  router;
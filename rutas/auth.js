//--------llamo al router
const { Router }=require('express');
const { check } = require('express-validator');
const { login } = require('../controladores/auth');
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


module.exports =  router;
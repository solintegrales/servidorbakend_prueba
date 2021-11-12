const {response} = require('express');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res=response, next)=>{
   
    //leeer token
    const token = req.header('x-token');
    //console.log(token);

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "no existe token"
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.jwt_secreta);
        //console.log(uid);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            alerta: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
};
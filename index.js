const express = require('express');
require('dotenv').config();
const {conexion} = require('./database/config');

//crear servidor de express
const app = express();

//lectura del body
app.use(express.json());

//conexion a base de datos
conexion();

//console.log(process.env);

//rutas
app.use('/', require('./rutas/principal'));
app.use('/api/usuario', require('./rutas/usuario'));
app.use('/api/login', require('./rutas/auth'));

//inicio servidor
app.listen(process.env.port, () => {
        console.log('se esta ejecutando en el puerto ' + process.env.port);
});
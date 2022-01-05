const express = require('express');
require('dotenv').config();
const {conexion} = require('./database/config');
const cors = require('cors');

//crear servidor de express
const app = express();

//lectura del body
app.use(express.json());
app.use(cors());


//conexion a base de datos
conexion();

//console.log(process.env);

//rutas
app.use('/', require('./rutas/principal'));
app.use('/api/usuario', require('./rutas/usuario'));
app.use('/api/hospital', require('./rutas/hospital'));
app.use('/api/medico', require('./rutas/medico'));
app.use('/api/todo', require('./rutas/buscar'));
app.use('/api/login', require('./rutas/auth'));

//inicio servidor
app.listen(process.env.port, () => {
        console.log('se esta ejecutando en el puerto ' + process.env.port);
});
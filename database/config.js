const mongoose = require('mongoose');

const conexion = async() => {
    try {
        await mongoose.connect(process.env.db);
        console.log('Base de datos arriba y funcional');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar mongo');
    }
}

module.exports={conexion};
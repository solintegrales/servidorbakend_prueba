const {Schema, model} = require('mongoose');

const Hschema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    estado:{
        type: String,
        required: true,
        default: 'activo'
    },
    direccion:{
        type: String,
        required: true,
    },
    ref_usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

Hschema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.version = __v;
    object.id = _id;
    return object;
})

module.exports = model('Hospital', Hschema);
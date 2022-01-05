const {Schema, model} = require('mongoose');

const Uschema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    clave:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    },
    estado:{
        type: String,
        required: true,
        default: 'activo'
    }
});

Uschema.method('toJSON', function(){
    const {__v, _id, clave, ...object} = this.toObject();
    object.version = __v;
    object.id = _id;
    return object;
})

module.exports = model('Usuario', Uschema);
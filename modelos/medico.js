const {Schema, model} = require('mongoose');

const Mschema = Schema({
    nombre:{
        type: String,
        required: true
    },
    ident:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        //required: true
    },
    celular:{
        type: String,
        required: true
    },
    email:{
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
    ref_usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    ref_hospital:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }

});

Mschema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.version = __v;
    object.id = _id;
    return object;
})

module.exports = model('Medico', Mschema);
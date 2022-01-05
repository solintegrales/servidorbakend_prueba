const {Schema, model} = require('mongoose');

const Prschema = Schema({
    datos:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
});

Prschema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.version = __v;
    object.id = _id;
    return object;
})

module.exports = model('Principal', Prschema);
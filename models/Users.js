const { Schema, model} = require ('mongoose');
const mongoose = require('mongoose');

const usersSchema = Schema({
    name: {
        type: String,
        required : true, 
        trim: true
    },
    lastname: {
        type: String,
        required : true, 
        trim: true
    },
    country :{
        type: String,
        required:true,
        enum:['Argentina','Brasil','Chile','Colombia','Uruguay','Otro']
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        trim:true
    }
})

module.exports = mongoose.model('Users', usersSchema);
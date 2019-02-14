const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const novoUsuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', novoUsuario);
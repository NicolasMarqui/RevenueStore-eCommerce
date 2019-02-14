const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newProduct = new Schema({
    nomeProduto: {
        type: String,
        required: true
    },
    categoriaProduto: {
        type: String,
        required: true
    },
    descricaoProduto: {
        type: String,
        required: true
    },
    precoProduto: {
        type: Number,
        required: true
    },
    quantidadeEmEstoque: {
        type: Number,
        required: true
    },
    imagemProduto: {
        type: String,
        required: true
    },
    idFornecedor: {
        type: Number,
        default: Math.random()
    },
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports = Produto = mongoose.model('produtos' , newProduct);
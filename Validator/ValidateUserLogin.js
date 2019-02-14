const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateUserLogin(data){

    let erros = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.senha = !isEmpty(data.senha) ? data.senha : '';

    if(Validator.isEmpty(data.email)){
        erros.email = "O campo email não pode ser vazio"
    }else if(!Validator.isEmail(data.email)){
        erros.email = "O email não está em um formato correto"
    }

    if(Validator.isEmpty(data.senha)){
        erros.senha = "O campo senha não pode estar vazio"
    }

    return{
        erros,
        isValid: isEmpty(erros),
    }
}
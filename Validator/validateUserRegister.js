const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateUserRegister(data){

    let erros = {};

    data.nome = !isEmpty(data.nome) ? data.nome : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.senha = !isEmpty(data.senha) ? data.senha : '';
    data.endereco = !isEmpty(data.endereco) ? data.endereco : '';

    if(Validator.isEmpty(data.nome)){
        erros.nome = "O campo nome não pode ser vazio"
    }

    if(Validator.isEmpty(data.email)){
        erros.email = "O campo email não pode ser vazio"
    }else if(!Validator.isEmail(data.email)){
        erros.email = "O email não está em um formato correto"
    }

    if(Validator.isEmpty(data.senha)){
        erros.senha = "O campo senha não pode estar vazio"
    }

    if(!Validator.isLength(data.senha, {min: 6, max: 30})){
        erros.senha = "A senha deve ter entre 6 e 30 caractéres"
    }

    if(Validator.isEmpty(data.endereco)){
        erros.endereco = "O campo endereço não pode ser vazio";
    }

    return{
        erros,
        isValid: isEmpty(erros),
    }
}
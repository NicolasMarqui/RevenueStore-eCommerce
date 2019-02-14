const express = require('express');
const User = require('../../models/Usuarios');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Produtos = require('../../models/Produtos');
const validateUserLogin = require('../../Validator/ValidateUserLogin');
const validateUserRegister = require('../../Validator/validateUserRegister');
const keys = require('../../config/key');
const jwt = require("jsonwebtoken");

router.get('/all', (req,res) => {
    Produtos.find({}, (err, produtos) => res.send(produtos)) 
})  

router.post('/add' , (req, res) => {
    const novoProduto = new Produtos({
        nomeProduto: req.body.nomeProduto,
        categoriaProduto: req.body.categoriaProduto,
        descricaoProduto: req.body.descricaoProduto,
        precoProduto: req.body.precoProduto,
        imagemProduto: req.body.imagemProduto,
        quantidadeEmEstoque: req.body.quantidadeEmEstoque,
    })

    novoProduto
        .save()
        .then(produtos => res.json(produtos))
        .catch(err => console.log(err))
})

router.get('/info/:id', (req,res) => {
    Produtos.find({_id: String(req.params.id)}, (err, produtos) => res.send(produtos))
})

router.post('/signup' , (req, res) => {

    const { erros , isValid } = validateUserRegister(req.body);

    if(!isValid){
        return res.status(400).json(erros);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({ email: 'Email já existe' });
            }
        })

    const novoUsuario = new User({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        endereco: req.body.endereco
    })

    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(novoUsuario.senha, salt , (err, hash) => {
            if (err) throw err;
            novoUsuario.senha = hash;

            novoUsuario
                .save()
                .then(user => res.json(user))
                .catch( err => console.log(err))
        })
    })
})

router.post('/login', (req,res) => {

    const { erros, isValid } = validateUserLogin(req.body);
    const senha = req.body.senha;

    if(!isValid){
        res.status(400).json(erros)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user){
                return res.status(400).json({ emailNotFound: 'Email não encontrado' })
            }

            bcrypt.compare(senha, user.senha).then(isMatch => {
                if(isMatch){
                    const payload = {
                        id: user.id,
                        name: user.nome
                    };

                    jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: 25200
                    }, (err, token) => {
                        res.json({ success: true, token: "Bearer " + token });
                    })
                }else{
                    return res.status(400).json({ senhaIncorreta: 'Senha incorreta' });
                }
            })
        
        })

})

router.get('/userInfo/:id', (req,res) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(err => console.log(err))
})

module.exports = router
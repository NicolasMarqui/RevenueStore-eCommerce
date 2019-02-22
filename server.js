const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/Usuarios')
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const db = require('./config/key').MongoURI;
const produtos = require('./routes/api/produtos');


const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client", "build")))

mongoose
    .connect(db, {useNewUrlParser: true})
    .then( () => console.log('Banco de dados conetado com sucesso'))
    .catch( err => console.log(err))

app.use(cors())
app.use('/api/produtos/', produtos);
app.use(passport.initialize());
<<<<<<< HEAD
require('./config/passport')(passport);

app.get('/', (req, res) => {
    res.sendFile('./client/public/index.html')
})
=======
require("./config/Passport")(passport);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port , () => console.log(`Server conectado na porta ${port}`));

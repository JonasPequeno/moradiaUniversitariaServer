'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('./configuracao/variables');


//Roda usadas na aplicação
const imovelRouter = require('../routes/router-imovel');
const usuarioRouter = require('../routes/usuario-router');

const app = express();

//Configurando o bodyParser para ser usado em nosso app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Variaveis
mongoose.connect(variables.Database.connection);

app.use('/api/usuario', usuarioRouter);
app.use('/api/imovel', imovelRouter);

module.exports = app;









'use strict'
const app = require('././bin/express');
const variaveis = require('././bin/configuracao/variables');



app.listen(variaveis.Api.port, () => {
    console.log(`Servidor rodadando na porta ${variaveis.Api.port}`);
});

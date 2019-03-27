'use stric'

const jwt = require('jsonwebtoken');
const variables = require('../configuracao/variables');
module.exports = async (req, res, next) => {
    let token = req.body || req.query.query || req.headers['x-acess-token'];

    if(token) {
        try {
            let decoded = await jwt.verify(token,variables.Security.chave);
            console.log(decoded);
            req.usuarioLogado = decoded;
            next();
            
        } catch (error) {
            
        }
    }else {
        return res.status(400).send({msg : "Falha  na autenticação"});;
    }
}
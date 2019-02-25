'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const imovelModel = new schema({
    sobreImovel: { index: true, required: true, type: String },
    sobreVaga: { type: String, required: true },
    foto: { type: String },
    endereco: {
        cidade: { type: String },
        numero: {type: Number},
        estado: { type: String },
        rua: { type: String }    
    },
    valorVaga: { type: Number, required: true },
    ativo: { type: Boolean, required: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

imovelModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataCriacao)
        this.dataCriacao = agora;
    next();
});

module.exports = mongoose.model('Imovel', imovelModel);
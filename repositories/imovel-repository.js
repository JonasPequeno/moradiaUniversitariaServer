
'use strict'

require('../models/imovelModel');
const base = require('../bin/base/repository-base');
const md5 = require('md5');

const modelo = 'Imovel';

class imovelRepository {

    constructor() {
        this._base = new base(modelo);
        this.projecao = 'sobreImovel sobreVaga foto valorVaga _id';
    }

    async create(imovel) {
        let imovelCriado = await this._base.create(imovel);
        return await this._base._model.findById(imovelCriado._id, this.projecao);

    }

    async getAll() {
        return await this._base._model.find({});
    }

    async getById(id) {
        return await this._base._model.findById(id, this.projecao);
    }

    async update(id, imovel) {
        console.log("<----Imovel recebido para editar---->");
        console.log(imovel);
        
        let imovelAtualizado = await this._base.update(id, {
            sobreImovel: imovel.sobreImovel,
            sobreVaga: imovel.sobreVaga,
            contato: imovel.contato,
            foto: imovel.foto,
            emailUser : imovel.emailUser,
            valorVaga: imovel.valorVaga,
            endereco: {
                cidade : imovel.endereco.cidade,
                numero : imovel.endereco.numero,
                rua : imovel.endereco.rua,
                estado : imovel.endereco.estado
            }
        });
        return this._base._model.findById(imovelAtualizado._id, this.projecao);
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = imovelRepository;


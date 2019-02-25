
'use strict'

require('../models/imovelModel');
const base = require('../bin/base/repository-base');
const md5 = require('md5');

const modelo = 'Imovel';

class imovelRepository {

    constructor() {
        this._base = new base(modelo);
        this.projecao = 'sobreImovel sobreVaga foto valorVaga';
    }

    async create(imovel) {
        let imovelCriado = await this._base.create(imovel);
        return await this._base._model.findById(imovelCriado._id, this.projecao);

    }

    async getAll() {
        return await this._base._model.find({}, this.projecao);
    }

    async getById(id) {
        return await this._base._model.findById(id, this.projecao);
    }

    async update(id, imovel) {
        let imovelAtualizado = await this._base.update(id, {
            sobreImovel: imovel.sobreImovel,
            sobreVaga: imovel.sobreVaga,
            foto: imovel.foto,
            valorVaga: imovel.valorVaga,
        });
        return this._base._model.findById(imovelAtualizado._id, this.projecao);
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = imovelRepository;


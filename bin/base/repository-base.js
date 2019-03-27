'use strict'

const mongoose = require('mongoose');

class baseRepository {

    constructor(modelo) {
        this._model = mongoose.model(modelo);
    }

    async create(data) {
        let modelo = new this._model(data);
        return await modelo.save();
    }

    async getAll() {
        return await this._model.find();
    }

    async getById(id) {
        return await this._model.findById(id);
    }

    async update(id, base) {               

        await this._model.findOneAndUpdate(id, { $set: base });
        return await this._model.findById(id);
    }

    async delete(id) {
        return await this._model.findByIdAndRemove(id);
    }
}

module.exports = baseRepository;

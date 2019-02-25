
'use strict'

require('../models/usuarioModel');
const base = require('../bin/base/repository-base');
const md5 = require('md5');

const modelo = 'Usuario';

class usuarioRepository {

    constructor() {
        this._base = new base(modelo);
        this.projecao = 'nome email _id instituicao';
    }

    async create(usuario) {
        let usuarioCriado = await this._base.create(usuario);
        return  await this._base._model.findById(usuarioCriado._id, this.projecao);

    }

    async isEmailExiste(Email) { 
       let result  = await this._base._model.find({email : Email},this.projecao);       
       console.log("Resultado do email " +resul);
       
       return result;
    }

    async authenticate(Email, Senha) {
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({ email: Email, senha: _hashSenha }, this.projecao);
    }

    async getAll() {
        return await this._base._model.find({}, this.projecao);
    }

    async getById(id) {
        return await this._base._model.findById(id, 'nome email _id foto');
    }

    async update(id, usuario) {
        let usuarioAtualizado = await this._base.update(id, {
            nome: usuario.nome,
            email: usuario.email,
            foto: usuario.foto,
            instituicao: usuario.instituicao,
        });
        return this._base._model.findById(usuarioAtualizado._id, this.projecao);
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = usuarioRepository;


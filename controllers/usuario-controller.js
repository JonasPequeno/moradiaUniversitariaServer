'use strict'

require('../models/usuarioModel');

const repository = require('../repositories/usuario-repository');
const validation = require('../bin/validation');
const _repo = new repository();
const md5 = require('md5');
const base = require('../bin/base/controller-base');

function usuarioController() {

}

usuarioController.prototype.post = async (req, res) => {

    let _validation = new validation();
    let data = req.body;
    console.log('Valor do corpo' + req.body.email);

    _validation.isRequired(req.body.nome, 'Informe seu nome!');
    _validation.isRequired(req.body.email, 'Informe seu e-mail!');
    _validation.isEmail(req.body.email, 'E-mail informado é inválido!');
    _validation.isRequired(req.body.senha, 'Senha deve ser informada!');
    _validation.isRequired(req.body.senhaConfirmacao, 'Informe a senha de confirmação');
    _validation.isTrue(req.body.senha != req.body.senhaConfirmacao, 'Senha não são iguais!');

    console.log('USUARIO RECEBIDO --> ' + req.body);

    //let isEmailExiste = await this._repo.isEmailExiste(req.body.email);

    //if (isEmailExiste) {
    //    _validation.isTrue((isEmailExiste.email != undefined),
    //        `O e-mail ${req.body.email} já esta cadastrado em nossa base de dados`
    //    );
    //};

    req.body.senha = md5(req.body.senha);

    await base.post(_repo, _validation, req, res);

};

usuarioController.prototype.put = async (req, res) => {
    let _validation = new validation();

    _validation.isRequired(req.body.email, 'Informe seu e-mail!');
    _validation.isEmail(req.body.email, 'E-mail informado é inválido!');
    _validation.isRequired(req.body.id, 'Informe o ID do usuario que será editado!');
    
    console.log("Usuario Putado");
    console.log(req.body);
/*    let isEmailExiste = await this._repo.isEmailExiste(req.body.email);

    if (isEmailExiste) {
        _validation.isTrue(
            (
                isEmailExiste.email != undefined
                && isEmailExiste._id != req.body.id

            ), `O e-mail ${req.body.email} já esta cadastrado em nossa base de dados`
        );
    };*/

    base.put(_repo, _validation, req, res);

};

usuarioController.prototype.get = async (req, res) => {
    base.get(_repo, req, res);
};

usuarioController.prototype.getById = async (req, res) => {
    base.getById(_repo, req, res);
};

usuarioController.prototype.delete = async (req, res) => {
    let resultado = await _repo.delete(req.params.id);
    res.status(204).send(resultado);
};

usuarioController.prototype.autenticar = async (req, res) => {
    let _validation = new validation();

    _validation.isRequired(req.body.email, 'Informe seu e-mail!');
    _validation.isEmail(req.body.email, 'E-mail informado é inválido!');
    _validation.isRequired(req.body.senha, 'Senha seu e-mail!');
    _validation.isEmail(req.body.senha, 'Senha informada é inválido!');

    if (req.body.email != null) {
        let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha);
        console.log("Usuario encontrado --->" + usuarioEncontrado);

        if (usuarioEncontrado) {
            res.status(200).send(usuarioEncontrado);
        } else res.status(200).send({});
    }
};

module.exports = usuarioController;
'use strict'

require('../models/imovelModel');

const repository = require('../repositories/imovel-repository');
const validation = require('../bin/validation');
const _repo = new repository();
const md5 = require('md5');
const base = require('../bin/base/controller-base');


function imovelController() {

}

imovelController.prototype.post = async (req, res) => {

    let _validation = new validation();
    let data = req.body;
    
    _validation.isRequired(req.body.sobreImovel, 'Informe a descrição do imóvel!');
    _validation.isRequired(req.body.sobreVaga, 'Informe a descrição da vaga!');
    _validation.isRequired(req.body.valorVaga, 'Informe o valor da vaga!');

    await base.post(_repo, _validation, req, res);

};

imovelController.prototype.put = async (req, res) => {
    let _validation = new validation();
    let data = req.body;
    
    _validation.isRequired(req.body.sobreImovel, 'Informe a descrição do imóvel!');
    _validation.isRequired(req.body.sobreVaga, 'Informe a descrição da vaga!');
    _validation.isRequired(req.body.valorVaga, 'Informe o valor da vaga!');      

    base.put(_repo, _validation, req, res);

};

imovelController.prototype.get = async (req, res) => {
    base.get(_repo, req, res);
};

imovelController.prototype.getById = async (req, res) => {
    base.getById(_repo, req, res);
};

imovelController.prototype.delete = async (req, res) => {
    let resultado = await _repo.delete(req.params.id);
    res.status(204).send(resultado);
};

module.exports = imovelController;
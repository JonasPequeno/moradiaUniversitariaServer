
'use strict'

exports.post = async (repository, validationContract, req, res) => {
    try {
        let data = req.body;

/*        if (!validationContract.isValid()) {
            res.status(400).send({
                mensage: "Existem dados inválidos na sua requisição!",
                validation: validationContract.errors()
            }).end();
            return;
        }*/

        let resultado = await repository.create(data);

        console.log("resultado", resultado);

        res.status(201).send(resultado);

    } catch (err) {
        console.error(`POST COM ERROS => ${err}`);
        res.status(500).send({ mensage: 'Erro no processamento', error: err });
    }
}
exports.put = async (repository, validationContract, req, res) => {
    try {
        let data = req.body;
        let id = req.params.id;

        let resultado = await repository.update(id, data);

        console.log("Resultado update", data);

        res.status(202).send(resultado);

    } catch (err) {
        console.error(`PUT COM ERROS => ${err}`);
        res.status(500).send({ mensage: 'Erro no processamento', error: err });
    }

}
exports.get = async (repository, req, res) => {

    try {

        let data = await repository.getAll();

        res.status(200).send(data);
    } catch (err) {
        console.error(`GET COM ERROS => ${err}`);
        res.status(500).send({ mensage: 'Erro no processamento', error: err });
    }

}
exports.getById = async (repository, req, res) => {

    try {
        let id = req.params.id;

        if (id) {
            let data = await repository.getById(id);
            if (data) {
                res.status(200).send(data);
            } else res.status(200).send('O ID Passado não foi encontrado!');
        } else {
            res.status(400).send({ mensage: 'Informe o ID' });
        }
    } catch (err) {
        console.error(`GETBYID COM ERROS => ${err}`);
        res.status(500).send({ mensage: 'Erro no processamento', error: err });
    }

}
exports.delete = async (repository, req, res) => {
    try {
        let id = req.params.id;

        if (id) {
            let data = await repository.delete(id);
            res.status(200).send({ mensage: 'O registro foi deletado com sucesso!' })
        } else {
            res.status(400).send({ mensage: 'Informe o ID' });
        }

    } catch (err) {
        console.error(`DELETE COM ERROS => ${err}`);
        res.status(500).send({ mensage: 'Erro no processamento', error: err });
    }
}
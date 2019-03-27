'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');
const mid = require('../bin/middlewares/autenticacao');


let _ctrl = new controller();

router.post('/autentica', _ctrl.autenticar);
router.get('/', _ctrl.get);
router.get('/:id', _ctrl.getById);
router.post('/', _ctrl.post);
router.put('/:id', _ctrl.put);
router.delete('/:id', _ctrl.delete);



module.exports = router;
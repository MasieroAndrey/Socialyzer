const interesses = require('express').Router();

const controllerInteresse = require('../controller/controllerinteresse')();





interesses.get('/', controllerInteresse.listarInteresse)
interesses.get('/povoar', controllerInteresse.povoarInteresse)
interesses.post('/', controllerInteresse.salvarInteresse)
interesses.put('/', controllerInteresse.alterarInteresse)
interesses.delete('/', controllerInteresse.excluirInteresse)


module.exports = interesses;
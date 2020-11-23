const interesses = require('express').Router();

const controllerInteresse = require('../controller/controllerinteresse')();





interesses.get('/', controllerInteresse.listarInteresse)
interesses.get('/povoar', controllerInteresse.povoarInteresse)
interesses.post('/', controllerInteresse.salvarInteresse)
interesses.put('/', controllerInteresse.alterarInteresse)
interesses.delete('/', controllerInteresse.excluirInteresse)

interesses.get('/buscarInteresseNome/:nome', controllerInteresse.buscarInteresseNome)
interesses.get('/buscarInteresseId/:id', controllerInteresse.buscarInteresseId)

module.exports = interesses;
module.exports = app => {
    const controller = {};

    const serialize = require('node-serialize');
    const Evento = require('../models/evento')
    const Interesse = require('../models/interesse')


    const interesses = require('../data/interesses')
    const eventos = require('../data/eventos')
    const usuarios = require('../data/usuarios');

    var interesseUm
    var interesseDois



    controller.criarEvento = (req, res) => {
        interesseUm = Math.floor(Math.random() * 9)
        interesseDois = Math.floor(Math.random() * 9)
        while (interesseUm == interesseDois) {
            interesseUm = Math.floor(Math.random() * 9)
            interesseDois = Math.floor(Math.random() * 9)
        }

        var event = new Evento()
        event.Idevento = contador()
        event.NomeEvento = NomeInteresse()
        event.Localizacao = req.body.Localizacao
        event.FaixaEtaria = req.body.FaixaEtaria
        event.RankEvento = req.body.RankEvento
        event.NotaEvento = req.body.NotaEvento
        event.ListaUsuarios = pesquisaUsuarios()
        //relacionamento usuario
        salvarEvento(event)
        res.status(200).send()

    }


    function pesquisaUsuarios() {
        var array = []
        usuarios.forEach(user => {
            user.ListaInteresse.forEach(interesse => {
                var filtro = array.filter((Usuario, index, array) => Usuario.Idusuario == user.Idusuario)
                console.log(filtro)
                if ((interesse.IdInteresse == interesseDois + 1 || interesse.IdInteresse == interesseUm + 1) && filtro.length == 0) {
                    array.push(user)
                }

            });
        });
        return array
    }



    function NomeInteresse() {
        return interesses[interesseUm].NomeInteresse + " - " + interesses[interesseDois].NomeInteresse
    }

    function salvarEvento(objevento) {
        eventos.push(objevento)

    };


    controller.listarEventos = (req, res) => res.status(200).json(eventos);


    controller.alterarEvento = (req, res) => {
        const index = req.body.Idevento
        eventos[index - 1] = req.body

        res.status(200).send()
    };
    controller.excluirEvento = (req, res) => {
        const index = req.body.Idevento

        eventos.splice(index - 1, 1)

        res.status(200).send()
    };

    function contador() {
        if (eventos.length == 0) {
            return 1
        } else {
            var teste = new Evento()
            teste = eventos[eventos.length - 1]
            return teste.Idevento + 1
        }
    }


/* Funcao a ser implementada junto com a media de nota dos usuarios*/
    function calculaNotas() {

        const totalDeNotas = eventos.NotaEvento.reduce((totalDeNotas, currentElement) => (totalDeNotas + currentElement))

        const media = totalDeNotas.map((mediaEvento, index, array) => {
            mediaEvento / 6;
            return mediaEvento;
        })
    }



    
    // controller.buscarEventos = (req, res) => {
    //     const { numero } = req.params

    //     res.status(200).json(eventos.filter((evento) => {
    //         return evento.numero === numero;
    //     }))
    // }

    // controller.validarEvento = (req, res, next) => {
    //     if (true) {
    //         res.status(400).send()
    //     }
    //     return next();
    // }



    return controller;
}



// 1.	Crud Usuário
// 2.	Crud Evento (array)
// 3.	Selecionar usuários random
// 4.	Selecionar 2 temas random
// 5.	Excluir e criar evento a cada 24horas
// 6.	Método de criação de sala com temas random
// 7.	Confirmar presença grupo/entrar grupo
// 8.	Informar nota evento (array, usar map média nota)
// 9.	Bloquear entradas de outros usuário (usando ip)
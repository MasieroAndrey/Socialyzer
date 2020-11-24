module.exports = app => {
    const controller = {};

    const serialize = require('node-serialize');
    const Evento = require('../models/evento')
    const Interesse = require('../models/interesse')

    const ObjectID = require('mongojs').ObjectId
    const axios = require('axios');

    const ListUsuario = []


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
        // event.Idevento = contador()
        // event.NomeEvento = NomeInteresse()
        event.Localizacao = req.body.Localizacao
        event.FaixaEtaria = req.body.FaixaEtaria
        event.RankEvento = req.body.RankEvento
        event.NotaEvento = req.body.NotaEvento
        RetornoApiInteresse()
        event.ListaUsuarios = listInteresse
        //relacionamento usuario
        salvarEvento(event)
        res.status(200).send()

    }

    async function RetornoApiInteresse() {


        const usuarioList = await returnJsonTodosUsuario()


        for (let i = 0; i < usuarioList.data.length; i++) {

            var teste2 = usuarioList.data[i]
            // console.log(teste2.Nome)
            for (let j = usuarioList.data.length - 1; j > 0; j--) {
                // if (i == j) {
                //     j--
                // }
                var teste = usuarioList.data[j]
                // console.log(teste.Nome)
                


                if (teste.listInteresse == teste2.listInteresse) {
                    ListUsuario.push(teste.Nome)
                    console.log(ListUsuario)

                }
            }

        }

    }

    // async function returnJsonTodosInteresse() {
    //     const responde = await axios.get('http://localhost:3331/interesse/')
    //     return responde
    // }
    // async function returnJsonUSuario(cpf){
    //     const responde = await axios.get(`http://localhost:3333/usuario/buscarInteressePorCpf/123`)
    //     return responde
    // }
    async function returnJsonTodosUsuario() {
        const responde = await axios.get(`http://localhost:3333/usuario/`)
        return responde
    }
    RetornoApiInteresse()


    const MongoClient = require('mongodb').MongoClient;

    var collectionEvento
    const uri = "mongodb+srv://asnnfosed:asnnfosed@cluster0.tfonb.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        if (err) {
            console.log(err)
        }
        const db = client.db('theminers')
        collectionEvento = db.collection('evento')
    });


    // function pesquisaUsuarios() {
    //     var array = []
    //     usuarios.forEach(user => {
    //         user.ListaInteresse.forEach(interesse => {
    //             var filtro = array.filter((Usuario, index, array) => Usuario.Idusuario == user.Idusuario)
    //             console.log(filtro)
    //             if ((interesse.IdInteresse == interesseDois + 1 || interesse.IdInteresse == interesseUm + 1) && filtro.length == 0) {
    //                 array.push(user)
    //             }

    //         });
    //     });
    //     return array
    // }



    function NomeInteresse() {
        return interesses[interesseUm].NomeInteresse + " - " + interesses[interesseDois].NomeInteresse
    }




    function salvarEvento(objevento) {
        collectionEvento.insertOne(objevento, (err, result) => {
            res.status(200).send()
        })

    };


    controller.listarEventos = (req, res) => {
        collectionEvento.find().toArray((err, items) => {
            res.status(200).json(items);
            var teste = "http://localhost:3331/interesse/buscarInteresseId/5fbc09a337a2de238cdd544b"
            console.log(teste)
        })
    }


    controller.alterarEvento = (req, res) => {
        var evento = req.body
        var id = evento._id;
        delete evento._id;
        collectionEvento.updateOne({ _id: ObjectID(id) }, { $set: evento }, (err, item) => {
            console.log(evento)
            console.log(id)
        })

        res.status(200).send()
    };


    controller.excluirEvento = (req, res) => {
        collectionEvento.deleteOne({ _id: ObjectID(req.body._id) }, (err, item) => {
            console.log(req.body)
        })
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
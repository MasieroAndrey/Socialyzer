const { NOMEM } = require('dns');
const bcrypt = require('bcrypt');




module.exports = () => {
    const controller = {};
    const serialize = require('node-serialize');
    const Usuario = require('../models/usuario')

    const interesses = require('../data/interesses')
    const eventos = require('../data/eventos')
    const usuarios = require('../data/usuarios');
    const ObjectID = require('mongojs').ObjectId
    const MongoClient = require('mongodb').MongoClient;
    const axios = require('axios');
    var collectionUsuario
    const uri = "mongodb+srv://asnnfosed:asnnfosed@cluster0.tfonb.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        if (err) { 
            console.log(err) 
        } 
        const db = client.db('theminers')
        collectionUsuario =db.collection('usuario')
    });


    controller.listarUsuarios = (req, res) => {
        collectionUsuario.find().toArray((err,usuarios)=>{
            res.status(200).json(usuarios);
        })
       

    }




    
    controller.index = (req, res) => {  
        res.render('index.ejs',{name : '#'})
    }
    controller.login = (req, res) => {  
        res.render('login.ejs')
    }
    controller.register = (req, res) => {
        res.render('register.ejs')

    }

    
    controller.registrar = async (req, res) => {

        try{
            // const hashedPassword = await bcrypt.hash(req.body.password, 10)
            var user = new Usuario()
            var userobj = serialize.unserialize(user)
            var listInsteresseUsuario = req.body.Interesses

            userobj.Nome = req.body.name,
            userobj.DataNascimento = req.body.DataNascimento,
            userobj.Sexo = req.body.Sexo,
            userobj.Cpf = req.body.Cpf,
            userobj.Descricao = req.body.Descricao,
            userobj.Email = req.body.email,
            userobj.Senha = req.body.password,
            userobj.ListaInteresse = listInsteresseUsuario,
            console.log(userobj.ListaInteresse)
            

           
            collectionUsuario.insertOne(userobj,(err,result) =>{
                if(err){
                    console.log(err)
                }else{
                    console.log("salvou interesse")
                }
            })
            
            
        }catch{
            console.log("erroo")
        }
        res.render('index.ejs',{name : userobj.Nome})
    }



    controller.logar = async (req, res) => {

        // var email = req.body.email
        // console.log(email)
            collectionUsuario.findOne({Email: req.body.email}, (err, items) => {
                
                if(items == null){
                    res.status(400).send('Usuario não encontrado')
                }else{
                    if(req.body.password === items.Senha){
                        res.render('index.ejs',{name : items.Nome})
                    }else{
                        console.log(items)
                        res.render('login.ejs')
                    }
                }
                
          })
          
        
        
        // const user = usuarios.find(user => user.email = req.body.email)
        
        // try {
        //     if(await bcrypt.compare(req.body.password, user.Senha)){
        //         res.render('index.ejs',{name : user.Nome})
        //     }else{
        //         res.render('login.ejs')
        //     }
        // } catch {
        //     res.status(500).send()
        // }    
        
    }

    // async function RetornoApiInteresse(listInsteresseUsuario){
    
    //     const api = await returnJson()
    //         var retornoInteresse = []
    //         for (let index = 0; index < listInsteresseUsuario.length; index++) {
    //             if (listInsteresseUsuario[index] == api.data[index].NomeInteresse) {
    //                 retornoInteresse.push(api.data[index].NomeInteresse)
    //                 console.log(api.data[index].NomeInteresse)
    //             }
    
    //         }
    //         return retornoInteresse
        
    // }
    
    // async function returnJson(){
    //     const responde = await axios.get('http://localhost:3331/interesse/')
    //     return responde
    // }
    





    controller.alterarUsuario = (req, res) => {
        var usuario = req.body
        var Cpf = usuario.Cpf;
        delete usuario._id;
        console.log(req.body._id)
        collectionUsuario.updateOne({Cpf: Cpf}, {$set: usuario}, (err, item) => {
            console.log(usuario)
            console.log(Cpf)
          })
 
        res.status(200).send()
    };

    controller.excluirUsuario = (req, res) => {
        var usuario = req.body
        console.log(usuario)
        collectionUsuario.deleteOne({Cpf: usuario.Cpf}, (err, item) => {
            console.log(usuario)
          })
          res.status(200).send()
    };


    //metodo selecionar 2 randons

    controller.buscaUsarioNome =(req,res)=>{
        var { nome } = req.params
        collectionUsuario.find({Nome: nome}).toArray((err, items) => {
            console.log(items)
            res.status(200).json(items);
          })
        // console.log(req.params)
    }
    controller.buscarUsuarioEmail =(req,res)=>{
        var { email } = req.params
        collectionUsuario.find({Email: email}).toArray((err, items) => {
            res.status(200).json(items);
          })
        console.log(req.params)
    }
    controller.buscarUsuarioCpf =(req,res)=>{
        var { cpf } = req.params
        collectionUsuario.findOne({Cpf: cpf}, (err, items) => {
                res.status(200).json(items);
          })
        console.log(req.params)
    }
    controller.listaInteressePorCpf =(req,res)=>{
        var { cpf } = req.params
        collectionUsuario.findOne({Cpf: cpf}, (err, items) => {
                res.status(200).json(items.ListaInteresse);
          })
        console.log(req.params)
    }
    
   

    controller.validarUsuario = (req, res, next) => {
        if (true) {
            res.status(400).send()
        }
        return next();
    }

    controller.upload = (req, res, next) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            const { type, name, path, size } = files.arquivo

            console.log("tamanho: "+size)

            if (size > 111110000) {
                const error = new Error();
                error.message = "tamanho do arquivo inválido";
                error.httpStatusCode = 400;
                error.code = 'ERR001';
                return next(error)
            }

            if (type.indexOf("image/png") != -1) {                
                fsextra.move(files.arquivo.path, './src/storage/' + files.arquivo.name, function (error) {
                    if (error) {                        
                        //error.httpStatusCode = 400;
                        //return next(error)
                        console.log(error)
                    }                    
                })
                res.write('File uploaded');
                res.end();
            } else {
                const error = new Error()
                error.message = "tipo do arquivo inválido"
                error.httpStatusCode = 400;
                error.code = 'ERR002';
                return next(error)
            }
        });

        //res.status(200).send()
    };





    return controller;
}
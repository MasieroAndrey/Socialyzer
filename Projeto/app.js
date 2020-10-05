const express = require('express');
const app = express()



app.use(express.json())

app.set('view-engie', 'ejs')

app.use(express.urlencoded({extended: false}))

const fs = require('fs');
const fsextra = require('fs-extra')
const yaml = require('js-yaml');

let env = process.env.NODE_ENV;
console.log(env)
if (env == undefined) {
    env = 'dev';
}

let data;

try {
    let fileContents = fs.readFileSync('./src/resources/' + env + '.yaml', 'utf8');
    data = yaml.safeLoad(fileContents);

    console.log(data['port']);
} catch (e) {
    console.log(e);
}


const usuarios = require('./src/routes/usuarios.route');
const interesses = require('./src/routes/interesse.route');
const eventos = require('./src/routes/eventos.route');
const blockedIps = ['192.168.15.161', '127.0.0.1']

// app.use(function (req, res, next) {
//     var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
//     if (ip.substr(0, 7) == "::ffff:") {
//         ip = ip.substr(7)
//     }

//     if (blockedIps.includes(ip)) {
//         return res.send('IP bloqueado')
//     }

//     return next()
// })

// try {
//     let fileContents = fs.readFileSync('./src/resources/dataInteresses.yaml', 'utf8');
//     let data = yaml.safeLoadAll(fileContents);
//     var interesseDado =[]
//     interesseDado.push(data)
//     console.log(interesseDado);
// } catch (e) {
//     console.log(e);
// }




app.use('/usuario', usuarios)
app.use('/evento', eventos)
app.use('/interesse', interesses)

app.use((error, req, res, next) => {
    res.status(error.httpStatusCode).json(error)
})


app.listen(process.env.PORT)
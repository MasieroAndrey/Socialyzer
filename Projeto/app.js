const express = require('express');
const app = express()
app.use(express.json())
app.set('view-engie', 'ejs')
app.use(express.urlencoded({extended: false}))


const usuarios = require('./src/routes/usuarios.route');






app.use('/usuario', usuarios)



app.use((error, req, res, next) => {
    res.status(error.httpStatusCode).json(error)
})

var porta = process.env.PORT || 3333
console.log(porta)
app.listen(porta)
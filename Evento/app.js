const express = require('express');
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


const eventos = require('./src/routes/eventos.route');

app.use('/evento', eventos)


app.use((error, req, res, next) => {
    res.status(error.httpStatusCode).json(error)
})

var porta = process.env.PORT || 3330
console.log(porta)
app.listen(porta)
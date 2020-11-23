const express = require('express');
const app = express()
app.use(express.json())

app.use(express.urlencoded({extended: false}))




const interesses = require('./src/routes/interesse.route');







app.use('/interesse', interesses)

app.use((error, req, res, next) => {
    res.status(error.httpStatusCode).json(error)
})

var porta = process.env.PORT || 3331
console.log(porta)
app.listen(porta)
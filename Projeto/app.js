const { default: Axios } = require('axios');
const express = require('express');
const app = express();

const axios = require('axios');

app.use(express.json())
app.set('view-engie', 'ejs')
app.use(express.urlencoded({ extended: false }))


const usuarios = require('./src/routes/usuarios.route');




// app.get('/interesse', async (req, res) =>{
//     try{
//         const {data} = await  api.get("interesse")
//         console.log(data)
//         return res.send({data})
//     }catch{
//         res.send({error: error.message})
//     }
// })

// async function RetornoApiInteresse(){
    
//     const api = await returnJson()
  
//     console.log(api.data)
// }

// async function returnJson(){
//     const responde = await axios.get('http://localhost:3331/interesse/')
//     return responde
// }
// console.log()



app.use('/usuario', usuarios)



app.use((error, req, res, next) => {
    res.status(error.httpStatusCode).json(error)
})

var porta = process.env.PORT || 3333
console.log(porta)
app.listen(porta)
const mongoose = require('mongoose')

async function contectaBancoDeDados() {
    try{
        console.log('Conexão com o banco de dados iniciou.')

        await mongoose.connect('mongodb+srv://nicolerrsilva:hLZPtx7vk9KTyfFB@clustermulheres.wszzfek.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMulheres')
    
        console.log('Conexão com o banco de dados feita com sucesso!')
    } catch(erro) {
        console.log(erro)
    }
}

module.exports = contectaBancoDeDados
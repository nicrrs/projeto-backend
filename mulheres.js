const express = require("express") //iniciando o express
const router = express.Router() //configurando a primeira parte da rota
const cors = require('cors')//trazendo o pacote corsque permite consumir essa API no front-end
const contectaBancoDeDados = require('./bancoDeDados') //ligando o banco de dados ao arquivo
contectaBancoDeDados() //chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //criando a porta

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)
    }catch (erro) {
        console.log(erro)
    }
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    }catch (erro){
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }
        
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBancoDeDados)

    }catch(erro){
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ messagem: 'Mulher deletada com sucesso!'})
    }catch (erro) {
        console.log(erro)
    }
}


app.use(router.get('/mulheres', mostraMulheres)) //configurada rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configurada rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //consigurada a rota PACTH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //consigurada a rota DELETE /mulheres/:id

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta) //servidor ouvindo a porta
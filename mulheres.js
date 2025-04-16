const express = require("express") //iniciando o express
const router = express.Router() //configurando a primeira parte da rota
const {v4: uuidv4} = require('uuid')

const app = express() //iniciando o app
app.use(express.json())
const porta = 3333 //criando a porta

//criando lista inicial de mulheres
const mulheres = [
    {
        id: '1',
        nome: 'Nicole Rocha',
        imagem: 'https://avatars.githubusercontent.com/u/177038268?v=4',
        minibio: 'Estudande de Desenvolvimento'
    },
    {
        id: '2',
        nome: 'Simara Conceição',
        imagem: 'https://bit.ly/3LJIyOF',
        minibio: 'Desenvolvedora e instrutora',
    },
    {
        id: '3',
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
        minibio: 'CEO & Founder da PrograMaria',   
    }
]

//GET
function mostraMulheres(request, response) {
    response.json(mulheres)
}

//POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)

}

//PATCH
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher
        }
    }

    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }

    response.json(mulheres)
}

//DELETE
function deletaMulher(request, response) {
    function todasMenosEla(mulher) {
        if(mulher.id !== request.params.id) {
            return mulher
        }
    }

    const mulheresQueFicam = mulheres. filter(todasMenosEla)

    response.json(mulheresQueFicam)
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
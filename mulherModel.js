const mongoose = require('mongoose')

const MulherSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    citacao: {
        type: String,
        required: true
    },
    minibio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('diva', MulherSchema)
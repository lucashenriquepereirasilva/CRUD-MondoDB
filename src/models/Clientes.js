/**
 * Modelo de daados para  construção das coleções ("tabelas")
 * Clientes
 */




// importação dos recursos framework mongoose

const {model,  Schema} = require('mongoose')


// Criação da estrutura da coleção Clientes
const clienteSchema = new Schema({
    nomeCliente: {
        type: String
    },

    foneCliente: {
        type: String
    },

    cpf: {
        type: String,
        unique: true,
        index: true
    },

    dataCadastro: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false}) // não versionar ps dados armazenados

// exportar para o main o modelo de dados
// Obs : clientes será o nome da coleção
module.exports = model('Clientes', clienteSchema)

/**
 *  Processo Principal
 * Estudo do banco de dados
 * @author Lucas henrique
 */

// importação do modulo de conexão
const { conectar, desconectar} = require('./database.js')

// importação do modelo de dados do cliente

const clienteModel = require("./src/models/Clientes.js")

// funcção para cadastrar um novo cliente
// Atenção para trabalhar com banco de dados usar sempre aysnc-await e try-catch

const salvarCliente = async(nomeCli, foneCli, cpfCli) => {
 try {
    // setar a estrutura de dados com os valorer
    //obs: usar os mesmos nomes da estrutura
    const novoCliente = new clienteModel({
        nomeCliente: nomeCli,
        foneCliente: foneCli,
        cpf: cpfCli
    })

    //a linha abaixo salva os dados no banco de dados
    await novoCliente.save()
    console.log("Cliente Adicionado com sucesso")

 } catch (error) {
    console.log(error)
 }
}

// ======================================================
const iniciarSistema = async  () => {
    console.clear()
    console.log("Estudo do MongoDB")
    console.log("-----------------------------------")
    await conectar()
    // CRUD cliente (inserção do banco de dados)
    await salvarCliente("Bora Billee", "707070", "19923553323")

    await salvarCliente("lucas ", "7043070", "142s")
    await salvarCliente("tor ", "7043070", "186ws")
    await salvarCliente("magic ", "7043070", "1986s")
    await salvarCliente("tor ", "7043070", "1992ws")

    await desconectar()

}

iniciarSistema()
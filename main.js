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
   // tratamento personalizados dos erros (execôes)
   if (error.code = 11000) {
    console.log(`Erro: O CPF ${cpfCli} já está cadastrado `)
   } else {
    console.log(error)
   }
 }
}

// função para listar todos os clientes
// .sort ({nomecliente: 1}) listar em ordem alfabetica (nome)
const listarClientes = async () => {
    try {
        const clientes =  await clienteModel.find().sort({nomeCliente: 1})
        console.log(clientes)
    } catch (error) {
        console.log(error)
    }
}

// função para buscar um cliente pelo nome

const buscarClienteNome = async (nome) => {
    try {
        
         const clienteNome = await clienteModel.find(
            { nomeCliente: new RegExp(nome, 'i')

            }
         )
         console.log(clienteNome)
    } catch (error) {
        console.log(error)
    }
}



const buscarClienteCPF = async (cpf) => {
    try {
        
         const clienteCPF = await clienteModel.find({ cpf: new  RegExp(cpf, 'i')  }
         )
         console.log(clienteCPF)
    } catch (error) {
        console.log(error)
    }
}


// função para editar os dados do cliente

// Atenção!! usar o id do cliente

const atualizarCliente = async (id , nomeCli, foneCli,  cpfCli) => {
    try {
const clienteEditado = await clienteModel.findByIdAndUpdate()
        id,
        {
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli
        },
        {
            new: true,
            runValidators: true
        }

        console.log("Dados do cliente alterado com sucesso")

    } catch (error) {
        if (error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado `)
           } else {
            console.log(error)
           }
         }
    }

    const excluirCliente = async (id) => {
        try {
            const clienteDeletado = await clienteModel.findByIdAndDelete(id)
            console.log("Cliente excluido com sucesso")
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
    //await salvarCliente("lucas", "707070", "19923553323")
    //await salvarCliente("carlinhos", "707070", "14675753323")
    //await salvarCliente("rober", "706570", "659499395")

    // CRUD Read (listar todos os clientes)
    // await buscarClienteNome("lucas")
     // await listarClientes()


     // CRUD (buscar pelo cpf do cliente)
    // await buscarClienteCPF("19923553323")

    //CRUD UPDATE (id do cliente)
   // await atualizarCliente('67daf75aaa58d8a6b2682123', "lucas", "548367", "80600006")
   await excluirCliente("67daf75aaa58d8a6b2682123")
   await desconectar()
    


}

iniciarSistema()
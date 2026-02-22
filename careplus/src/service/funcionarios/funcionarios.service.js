import { api } from "../api";

async function listarFuncionarios(){
    try{
        const response = await api.get('/funcionarios')

        if(response.status === 200){
            const dados = response.data
            console.log(dados)
            return dados
        }
    }catch (error){
        console.error(error)
    }
}

export { listarFuncionarios}
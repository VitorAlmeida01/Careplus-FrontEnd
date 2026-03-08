import { api } from "../api";

async function listarFuncionarios(pagina){
    try{
        const response = await api.get(`/funcionarios/todos-funcionarios?pagina=${pagina}`)

        if(response.status === 200){
            const dados = response.data
            return dados
        }
    }catch (error){
        console.error(error)
    }
}


export { listarFuncionarios}
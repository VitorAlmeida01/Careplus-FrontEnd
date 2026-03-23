import { api } from "../api";

async function listarTodosResponsaveis(){
    try{
        const response = await api.get(`/responsaveis`)

        if(response.status === 200){
            const dados = response.data
            return dados
        }
    }catch (error){
        console.error(error)
    }
}

export { listarTodosResponsaveis}
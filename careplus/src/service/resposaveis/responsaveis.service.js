import { api } from "../api";

async function listarTodosResponsaveis(pagina){
    try{
        const response = await api.get(`/responsaveis?pagina=${pagina}`)

        if(response.status === 200){
            const dados = response.data
            return dados
        }
    }catch (error){
        console.error(error)
    }
}

export { listarTodosResponsaveis}
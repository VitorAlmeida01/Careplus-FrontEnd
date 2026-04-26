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

export async function buscarResponsaveis(query) {
    try {
        const isEmail = query.includes('@')
        const isCpf = /\d/.test(query)
        const params = isEmail ? { email: query } : isCpf ? { cpf: query } : { nome: query }
        const response = await api.get('/responsaveis/buscar', { params })
        if (response.status === 200) return response.data
    } catch (error) {
        console.error(error)
    }
    return []
}

export { listarTodosResponsaveis}
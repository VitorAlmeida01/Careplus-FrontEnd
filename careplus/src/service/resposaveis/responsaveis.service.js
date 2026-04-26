import { api } from "../api";

async function listarTodosResponsaveis(pagina){
    try{
        const response = await api.get(`/responsaveis?pagina=${pagina}`)
        if(response.status === 200) return response.data
    }catch (error){
        console.error(error)
    }
}

async function listarResponsaveisInativos(pagina){
    try{
        const response = await api.get(`/responsaveis/inativos?pagina=${pagina}`)
        if(response.status === 200) return response.data
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

async function atualizarResponsavel(id, dados){
    const response = await api.put(`/responsaveis?id=${id}`, dados)
    return response
}

async function deletarResponsavel(id){
    const response = await api.delete(`/responsaveis?id=${id}`)
    return response
}

async function reativarResponsavel(id){
    const response = await api.patch(`/responsaveis/reativar?id=${id}`)
    return response
}

export { listarTodosResponsaveis, listarResponsaveisInativos, atualizarResponsavel, deletarResponsavel, reativarResponsavel }
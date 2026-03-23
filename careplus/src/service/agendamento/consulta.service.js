import {api} from '../api'

export async function buscarPacientePorNome(name){
    if (!name || name === "undefined") {
        console.warn("Busca cancelada: o nome está indefinido.");
        return null;
    }

    try {
        const response = await api.get(`/pacientes/por-nome?nome=${name}`);
        return response.data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
}
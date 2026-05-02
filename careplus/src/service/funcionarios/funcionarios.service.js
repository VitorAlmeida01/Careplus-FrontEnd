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

export async function listarFuncionariosInativos(pagina) {
    try {
        const response = await api.get(`/funcionarios/inativos?pagina=${pagina}`)
        if (response.status === 200) return response.data
    } catch (error) {
        console.error(error)
    }
}


export { listarFuncionarios}


async function listarSupervisores(){
    try{
        const response = await api.get(`/funcionarios/supervisores`)

        if(response.status === 200){
            const dados = response.data
            return dados
        }

    }catch(error){
        console.error(error)
    }
}

export {listarSupervisores}

export async function atualizarFuncionario(id, dados) {
    const formData = new FormData()
    formData.append("nome", dados.nome)
    formData.append("email", dados.email)
    formData.append("documento", dados.documento)
    formData.append("cargo", dados.cargo)
    if (dados.especialidade) formData.append("especialidade", dados.especialidade)
    if (dados.telefone) formData.append("telefone", dados.telefone)
    if (dados.supervisor) formData.append("supervisor.id", dados.supervisor)
    const response = await api.put(`/funcionarios?idFuncionario=${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}

const _fotoFuncionarioCache = new Map()

export function getCachedFotoFuncionario(documento) {
    return _fotoFuncionarioCache.get(documento) ?? null
}

export async function buscarFotoFuncionario(documento) {
    if (_fotoFuncionarioCache.has(documento)) return _fotoFuncionarioCache.get(documento)
    try {
        const response = await api.get('/funcionarios/foto', {
            params: { documento },
            responseType: 'arraybuffer',
        })
        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'image/jpeg' })
            const url = URL.createObjectURL(blob)
            _fotoFuncionarioCache.set(documento, url)
            return url
        }
    } catch (error) {
        console.log(error)
    }
    return null
}

export async function cadastrarFuncionario(formData) {
    const response = await api.post("/funcionarios", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}

export async function deletarFuncionario(id) {
    const response = await api.delete(`/funcionarios?id=${id}`)
    return response.data
}

export async function reativarFuncionario(id) {
    const response = await api.patch(`/funcionarios/reativar?id=${id}`)
    return response.data
}

export async function buscarFuncionarios(query) {
    try {
        const isEmail = query.includes('@');
        const isDocumento = /^[\d.\-/]+$/.test(query);
        const params = isEmail ? { email: query } : isDocumento ? { documento: query } : { nome: query };
        const response = await api.get('/funcionarios/buscar', { params });
        if (response.status === 200) return response.data;
    } catch (error) {
        console.error(error);
    }
    return [];
}
import { api } from "../api";

export async function listarMeusPacientes(pagina, idFuncionario) {
    try {
        const response = await api.get("/pacientes/todos-pacientes-funcionario", {
            params: { pagina, idFuncionario },
        })
        if (response.status === 200) return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function listarPacitentes(pagina) {
    try{
        const response = await api.get(`/pacientes/todos-pacientes?pagina=${pagina}`)

        if(response.status === 200){
            const dados = response.data
            return dados
        }
    }catch(error){
        console.log(error)
    }
}

export async function listarPacientesInativos(pagina) {
    try {
        const response = await api.get(`/pacientes/inativos?pagina=${pagina}`)
        if (response.status === 200) return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function listarPacitentesPorNome(nome) {
    try{
        const response = await api.get(`/pacientes/por-nome?nome=${nome}`)

        if(response.status === 200){
            const dados = response.data
            return dados
        }
    }catch(error){
        console.log(error)
    }
}

export async function deletarPaciente(id) {
    const response = await api.delete(`/pacientes?id=${id}`)
    return response.data
}

export async function reativarPaciente(id) {
    const response = await api.patch(`/pacientes/reativar?id=${id}`)
    return response.data
}

export async function buscarPacientes(query) {
    try {
        const isEmail = query.includes('@');
        const isCpf = /\d/.test(query);
        const params = isEmail ? { email: query } : isCpf ? { cpf: query } : { nome: query };
        const response = await api.get('/pacientes/buscar', { params });
        if (response.status === 200) return response.data;
    } catch (error) {
        console.log(error);
    }
    return [];
}

const _fotoPacienteCache = new Map()

export async function atualizarFotoPaciente(cpf, arquivo) {
    const formData = new FormData()
    formData.append('foto', arquivo)
    await api.patch(`/pacientes/foto?cpf=${cpf}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    _fotoPacienteCache.delete(cpf)
}

export async function buscarFotoPaciente(cpf) {
    if (_fotoPacienteCache.has(cpf)) return _fotoPacienteCache.get(cpf)
    try {
        const response = await api.get('/pacientes/foto', {
            params: { cpf },
            responseType: 'arraybuffer',
        })
        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'image/jpeg' })
            const url = URL.createObjectURL(blob)
            _fotoPacienteCache.set(cpf, url)
            return url
        }
    } catch (error) {
        console.log(error)
    }
    return null
}

export async function atualizarPaciente(id, dados) {
    const formData = new FormData()
    formData.append('nome', dados.nome)
    formData.append('email', dados.email)
    formData.append('cpf', dados.cpf)
    if (dados.telefone) formData.append('telefone', dados.telefone)
    formData.append('dtNascimento', dados.dtNascimento)
    if (dados.convenio) formData.append('convenio', dados.convenio)
    if (dados.foto) formData.append('foto', dados.foto)
    const response = await api.put(`/pacientes?id=${id}`, formData)
    return response.data
}

export async function cadastrarPaciente(paciente){
    try{
        const formData = new FormData()
        
        // Dados do Paciente
        formData.append('nomePaciente', paciente.nomePaciente)
        formData.append('emailPaciente', paciente.emailPaciente)
        formData.append('cpfPaciente', paciente.cpfPaciente)
        formData.append('telefonePaciente', paciente.telefonePaciente)
        formData.append('dtNascimentoPaciente', paciente.dtNascimentoPaciente)
        
        if(paciente.convenioPaciente){
            formData.append('convenioPaciente', paciente.convenioPaciente)
        }
        
        if(paciente.fotoPaciente){
            formData.append('fotoPaciente', paciente.fotoPaciente)
        }
        
        // Dados do Responsável
        formData.append('nomeResponsavel', paciente.nomeResponsavel)
        formData.append('emailResponsavel', paciente.emailResponsavel)
        formData.append('telefoneResponsavel', paciente.telefoneResponsavel)
        formData.append('dtNascimentoResponsavel', paciente.dtNascimentoResponsavel)
        formData.append('cpfResponsavel', paciente.cpfResponsavel)
        formData.append('parentesco', paciente.parentesco)
        
        // Endereço
        formData.append('cep', paciente.cep)
        formData.append('logradouro', paciente.logradouro)
        formData.append('numero', paciente.numero)
        formData.append('bairro', paciente.bairro)
        formData.append('cidade', paciente.cidade)
        formData.append('estado', paciente.estado)
        
        if(paciente.complemento){
            formData.append('complemento', paciente.complemento)
        }

        console.log("FormData para cadastro:", formData)

        const response = await api.post('/pacientes/formCadastro', formData)

        if(response.status === 201){
            const dados = response.data
            return dados
        }
    }catch(error){
        console.log(error)
        throw error
    }
}
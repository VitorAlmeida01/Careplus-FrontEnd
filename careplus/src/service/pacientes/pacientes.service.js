import { api } from "../api";

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

        const response = await api.post('/pacientes', formData)

        if(response.status === 201){
            const dados = response.data
            return dados
        }
    }catch(error){
        console.log(error)
        throw error
    }
}
import { api } from "../api";

export async function listarPacitentes() {
    try{
        const response = await api.get('/pacientes/todos-pacientes?pagina=0')

        if(response.status === 200){
            const dados = response.data.content
            return dados
        }
    }catch(error){
        console.log(error)
    }
}

export async function cadastrarPaciente(paciente){
    try{
        const formData = new FormData()
        
        // Adiciona cada campo explicitamente ao FormData
        formData.append('nome', paciente.nome)
        formData.append('email', paciente.email)
        formData.append('cpf', paciente.cpf)
        formData.append('telefone', paciente.telefone)
        formData.append('dtNascimento', paciente.dtNascimento)
        
        if(paciente.convenio){
            formData.append('convenio', paciente.convenio)
        }
        
        if(paciente.foto){
            formData.append('foto', paciente.foto)
        }

        const response = await api.post('/pacientes', formData)

        if(response.status === 201){
            const dados = response.data
            return dados
        }
    }catch(error){
        console.log(error)
    }
}
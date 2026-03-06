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
        
        // Adiciona cada campo ao FormData
        Object.keys(paciente).forEach(key => {
            if(paciente[key] !== null && paciente[key] !== undefined){
                formData.append(key, paciente[key])
            }
        })

        const response = await api.post('/pacientes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if(response.status === 201){
            const dados = response.data
            return dados
        }
    }catch(error){
        console.log(error)
    }
}
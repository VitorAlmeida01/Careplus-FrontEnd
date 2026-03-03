import { api } from "../api";

export async function listarPacitentes() {
    try{
        const response = await api.get('/pacientes')

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
        const response = await api.post('/pacientes', paciente)

        if(response.status === 201){
            const dados = response.data
            return dados
        }
    }catch(error){
        console.log(error)
    }
}
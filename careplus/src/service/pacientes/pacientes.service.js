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
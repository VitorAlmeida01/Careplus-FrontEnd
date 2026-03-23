import { api } from "../api";

async function fichaClinicaPorPaciente(idPaciente){
    try{
        const response = await api.get(`/detalhes-pacientes/detalhes-completos?id=${idPaciente}`)

        if(response.status === 200){
            const dados = response.data
            return dados
        }
    }catch (error){
        console.error(error)
    }
}


export { fichaClinicaPorPaciente}
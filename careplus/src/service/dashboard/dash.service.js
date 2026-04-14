import { api } from "../api";

export async function buscarPacienteSemConsulta(){
    try{
        const response = await api.get('/relatorios/pacientes-sem-consulta');
        console.log(response.data);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar pacientes sem consulta:', error);
    }
}


export async function buscarSeguradora(){
    try{
        const response = await api.get('/relatorios/pacientes-por-convenio');
        console.log(response.data);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar contagem de convênio:', error);
    }
}


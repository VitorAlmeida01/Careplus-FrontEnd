import { api } from "../api";

export async function buscarPacienteSemConsulta(){
    try{
        const response = await api.get('/relatorios/pacientes-sem-consulta');
        return response.data;
    }catch(error){
        console.error('Erro ao buscar pacientes sem consulta:', error);
    }
}


export async function buscarSeguradora(){
    try{
        const response = await api.get('/relatorios/pacientes-por-convenio');
        return response.data;
    }catch(error){
        console.error('Erro ao buscar contagem de convênio:', error);
    }
}


export async function buscarFuncionariosEPacientesPorArea(){
    try{
        const response = await api.get('/relatorios/funcionarios-por-especialidade')
        console.log(response.data)
        return response.data
    } catch(error){
        console.error('Erro ao buscar funcionarios e pacientes por area:', error)
    }
}


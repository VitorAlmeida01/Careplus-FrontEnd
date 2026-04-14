import {api} from '../api'

export async function buscarPacientePorNome(name){
    if (!name || name === "undefined") {
        console.warn("Busca cancelada: o nome está indefinido.");
        return null;
    }

    try {
        const response = await api.get(`/pacientes/por-nome?nome=${name}`);
        return response.data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
}

export async function marcarConsulta(pacienteId, funcionarioId, dataHora, tipo){
   if(!pacienteId || !funcionarioId || !dataHora || !tipo){
       console.warn("Marcação de consulta cancelada: um ou mais parâmetros estão indefinidos.");
       return null;
   }

   try {
       const response = await api.post("/consultas-prontuario", {
           pacienteId,
           funcionarioId,
           dataHora,
           tipo
       });
       return response.data;
   } catch (error) {
       console.error("Erro na requisição:", error);
       return null;
   }

}

export async function marcarConsultaRecorrente(payload){
    if(!payload){
        console.warn("Marcação de consulta recorrente cancelada: payload está indefinido.");
        return null;
    }

    try {
        const response = await api.post("/consultas-prontuario/recorrentes", payload);
        return response.data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
}
import {api} from "../api"

export async function listarConsultas(){
    try{
        const response = await api.get(`/consultas-prontuario`)

        const mapaEventos = response.data.reduce((acc, evento) => {
          const dataKey = evento.dataHora.split(' ')[0];
          const eventoFormatado = {
            ...evento,
            date: new Date(evento.dataHora.replace(' ', 'T')),
            title: `${evento.paciente.nome} - ${evento.tipo}`,
            color: 'bg-blue-500'
          };
          if (!acc[dataKey]) acc[dataKey] = [];
          acc[dataKey].push(eventoFormatado);
          return acc;
        }, {});

        return mapaEventos;
    } catch (error){
        console.error("Erro ao listar consultas: ", error)
    }
    
} 

export async function listarFuncionariosConsulta() {
    try{
        const response = await api.get(`/funcionarios`)

        return response;
    } catch(error){
        console.error("Erro ao listar Funcionarios: ", error)
    }
}
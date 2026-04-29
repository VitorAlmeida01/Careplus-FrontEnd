import {api} from "../api"

const CORES_ESPECIALIDADE = {
    'Fonoaudiologia':       'bg-purple-500',
    'Psicologia':           'bg-green-500',
    'Terapia Ocupacional':  'bg-blue-500',
    'Psicopedagogia':       'bg-pink-400',
    'Nutricionista':        'bg-slate-600',
    'Fisioterapia':         'bg-orange-300',
    'Psicomotricidade':     'bg-yellow-400',
    'Musicoterapia':        'bg-slate-300',
}

function corEvento(evento) {
    const especialidade =
        evento.funcionario?.especialidade ??
        evento.consultaFuncionarios?.[0]?.funcionario?.especialidade ??
        evento.funcionarios?.[0]?.especialidade
    return CORES_ESPECIALIDADE[especialidade] ?? 'bg-blue-500'
}

// Converte uma lista de ConsultaProntuarioResponseDto (formato novo: data + horarioInicio)
// para o mapa de eventos { 'yyyy-MM-dd': [...] } usado pelos componentes de calendário.
export function normalizarConsultas(lista) {
    return (lista ?? []).reduce((acc, evento) => {
        if (!evento.data || !evento.horarioInicio) return acc;
        const dateKey = evento.data; // já em "yyyy-MM-dd"
        const eventoFormatado = {
            ...evento,
            date: new Date(`${evento.data}T${evento.horarioInicio}`),
            title: `${evento.paciente?.nome ?? 'Paciente'} - ${evento.tipo ?? ''}`,
            color: corEvento(evento),
        };
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(eventoFormatado);
        return acc;
    }, {});
}

export async function listarConsultas(){
    try{
        const response = await api.get(`/consultas-prontuario`)
        return normalizarConsultas(response.data);
    } catch (error){
        console.error("Erro ao listar consultas: ", error)
        return {}
    }
} 

export async function listarAgendaSemanal(id, tipo, dataReferencia) {
    try {
        const response = await api.get(`/consultas-prontuario/agenda-semanal`, {
            params: { id, tipo, dataReferencia }
        });
        return response.data ?? [];
    } catch (error) {
        console.error("Erro ao listar agenda semanal: ", error);
        return [];
    }
}

export async function listarAgendaDiaria(id, tipo, dataReferencia) {
    try {
        const response = await api.get(`/consultas-prontuario/agenda-diaria`, {
            params: { id, tipo, dataReferencia }
        });
        console.log('Agenda diaria Tipo ' + tipo)
        console.log('Agenda diaria TESTEEE ' + response.data)
        return response.data ?? [];
    } catch (error) {
        console.error("Erro ao listar agenda diária: ", error);
        return [];
    }
}

export async function listarAgendaMensal(id, tipo, dataReferencia) {
    try {
        const response = await api.get(`/consultas-prontuario/agenda-mensal`, {
            params: { id, tipo, dataReferencia }
        });
        return response.data ?? [];
    } catch (error) {
        console.error("Erro ao listar agenda mensal: ", error);
        return [];
    }
}

export async function notificarResponsavel(id, dataReferencia) {
    try {
        const response = await api.get(`/consultas-prontuario/notificar-responsavel`, {
            params: { id, dataReferencia }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao notificar responsável: ", error);
        throw error;
    }
}

export async function listarConsultasPorPaciente(pacienteId) {
    try {
        const response = await api.get(`/consultas-prontuario/por-paciente`, {
            params: { idPaciente: pacienteId }
        });
        return response.data ?? [];
    } catch (error) {
        console.error("Erro ao listar consultas por paciente: ", error);
        return [];
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

export async function listarEspecialidades() {
    try {
        const response = await api.get('/funcionarios/especialidades')
        return response.data ?? []
    } catch (error) {
        console.error("Erro ao listar especialidades: ", error)
        return []
    }
}

export async function listarFuncionariosPorEspecialidade(especialidade) {
    try {
        const response = await api.get('/funcionarios/nomesPorEspecialidade', { params: { especialidade } })
        return response.data ?? []
    } catch (error) {
        console.error("Erro ao listar funcionários por especialidade: ", error)
        return []
    }
}

export async function editarConsulta(id, body) {
    try {
        const response = await api.put(`/consultas-prontuario/${id}`, body);
        return response.data;
    } catch (error) {
        console.error("Erro ao editar consulta: ", error);
        throw error;
    }
}

export async function deletarConsulta(id) {
    try {
        await api.delete(`/consultas-prontuario`, { params: { id } });
    } catch (error) {
        console.error("Erro ao deletar consulta: ", error);
        throw error;
    }
}

export async function deletarRecorrencia(recorrenciaId) {
    try {
        await api.delete(`/consultas-prontuario/recorrencia/${recorrenciaId}`);
    } catch (error) {
        console.error("Erro ao deletar recorrência: ", error);
        throw error;
    }
}
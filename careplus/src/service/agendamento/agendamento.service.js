import {api} from "../api"

const CORES_ESPECIALIDADE = {
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

export async function listarAgendaSemanal(funcionarioId, dataReferencia) {
    try {
        const response = await api.get(`/consultas-prontuario/agenda-semanal`, {
            params: { funcionarioId, dataReferencia }
        });
        return response.data ?? [];
    } catch (error) {
        console.error("Erro ao listar agenda semanal: ", error);
        return [];
    }
}

export async function listarConsultasDoDia(funcionarioId) {
    try {
        const response = await api.get(`/consultas-prontuario/consultasDoDia`, {
            params: { idFuncionario: funcionarioId }
        });
        return response.data ?? [];
    } catch (error) {
        console.error("Erro ao listar consultas do dia: ", error);
        return [];
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
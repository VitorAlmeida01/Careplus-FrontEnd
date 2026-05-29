// Calcula a data do último domingo (quando o cron rodou)
function ultimoDomingo() {
  const hoje = new Date()
  const domingo = new Date(hoje)
  domingo.setDate(hoje.getDate() - hoje.getDay())
  return domingo
}

// Calcula diasRestantes a partir de hoje até uma dataFim "yyyy-MM-dd"
function calcularDiasRestantes(dataFimStr) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const fim = new Date(`${dataFimStr}T00:00:00`)
  return Math.ceil((fim - hoje) / (1000 * 60 * 60 * 24))
}

const MOCK_RECORRENCIAS_A_VENCER = [
  {
    pacienteId: 1,
    pacienteNome: "Lucas Mendes",
    recorrencias: [
      {
        recorrenciaId: 101,
        profissionalNome: "Ana Souza",
        especialidade: "Fonoaudiologia",
        diasSemana: [1, 3],
        horarioInicio: "09:00",
        horarioFim: "10:00",
        tipo: "Sessão Regular",
        dataFim: "2026-05-27",
      },
      {
        recorrenciaId: 102,
        profissionalNome: "Carlos Lima",
        especialidade: "Psicologia",
        diasSemana: [2, 4],
        horarioInicio: "14:00",
        horarioFim: "15:00",
        tipo: "Sessão Regular",
        dataFim: "2026-05-26",
      },
    ],
  },
  {
    pacienteId: 2,
    pacienteNome: "Maria Clara Oliveira",
    recorrencias: [
      {
        recorrenciaId: 103,
        profissionalNome: "Fernanda Costa",
        especialidade: "Terapia Ocupacional",
        diasSemana: [1, 2, 3],
        horarioInicio: "10:00",
        horarioFim: "11:00",
        tipo: "Sessão Regular",
        dataFim: "2026-05-30",
      },
    ],
  },
  {
    pacienteId: 3,
    pacienteNome: "Pedro Alves Santos",
    recorrencias: [
      {
        recorrenciaId: 104,
        profissionalNome: "Roberto Nunes",
        especialidade: "Psicopedagogia",
        diasSemana: [5],
        horarioInicio: "08:00",
        horarioFim: "09:00",
        tipo: "Avaliação Inicial",
        dataFim: "2026-05-25",
      },
      {
        recorrenciaId: 105,
        profissionalNome: "Ana Souza",
        especialidade: "Fonoaudiologia",
        diasSemana: [3, 5],
        horarioInicio: "11:00",
        horarioFim: "12:00",
        tipo: "Sessão Regular",
        dataFim: "2026-05-28",
      },
    ],
  },
  {
    pacienteId: 4,
    pacienteNome: "Isabela Rodrigues",
    recorrencias: [
      {
        recorrenciaId: 106,
        profissionalNome: "Mariana Ferreira",
        especialidade: "Fisioterapia",
        diasSemana: [1, 3, 5],
        horarioInicio: "13:00",
        horarioFim: "14:00",
        tipo: "Sessão Regular",
        dataFim: "2026-05-26",
      },
    ],
  },
]

export async function listarRecorrenciasAVencer() {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const dados = MOCK_RECORRENCIAS_A_VENCER.map((grupo) => ({
    ...grupo,
    recorrencias: grupo.recorrencias.map((r) => ({
      ...r,
      diasRestantes: calcularDiasRestantes(r.dataFim),
    })),
  }))

  return { dados, ultimaAtualizacao: ultimoDomingo() }
}

export async function renovarRecorrencia(recorrenciaId, payload) {
  // payload: { diasSemana: number[], dataFim: string }
  await new Promise((resolve) => setTimeout(resolve, 400))
  return { success: true, recorrenciaId }
}

export async function dispensarNotificacao(recorrenciaId) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return { success: true, recorrenciaId }
}

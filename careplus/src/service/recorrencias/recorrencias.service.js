import { api } from "../api"

function ultimoDomingo() {
  const hoje = new Date()
  const domingo = new Date(hoje)
  domingo.setDate(hoje.getDate() - hoje.getDay())
  return domingo
}

export async function listarRecorrenciasAVencer() {
  const response = await api.get("/notificacoes")
  return { dados: response.data, ultimaAtualizacao: ultimoDomingo() }
}

export async function renovarRecorrencia(recorrenciaId, payload) {
  await api.post(`/notificacoes/${encodeURIComponent(recorrenciaId)}/renovar`, payload)
  return { success: true }
}

export async function dispensarNotificacao(recorrenciaId) {
  await api.delete(`/notificacoes/${encodeURIComponent(recorrenciaId)}`)
  return { success: true }
}

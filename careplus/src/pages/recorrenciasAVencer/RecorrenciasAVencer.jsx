import { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import Loading from "../../components/loading/Loading"
import ModalRenovarRecorrencia from "./components/ModalRenovarRecorrencia"
import ConfirmacaoModal from "../../components/modalConfirmacao/ConfirmacaoModal"
import { listarRecorrenciasAVencer, dispensarNotificacao } from "../../service/recorrencias/recorrencias.service"
import { toast } from "react-toastify"

const DIAS_UTEIS = [
  { value: 1, nome: "Segunda" },
  { value: 2, nome: "Terça" },
  { value: 3, nome: "Quarta" },
  { value: 4, nome: "Quinta" },
  { value: 5, nome: "Sexta" },
]

// Urgência calibrada para janela semanal (0–7 dias)
const URGENCIA = {
  urgente: {
    label: "Urgente",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-600",
    dot: "bg-red-500",
    headerBg: "bg-red-50",
  },
  atencao: {
    label: "Atenção",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-600",
    dot: "bg-amber-500",
    headerBg: "bg-amber-50",
  },
  semana: {
    label: "Esta semana",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-600",
    dot: "bg-blue-400",
    headerBg: "bg-blue-50",
  },
}

function getUrgencia(diasRestantes) {
  if (diasRestantes <= 1) return "urgente"
  if (diasRestantes <= 4) return "atencao"
  return "semana"
}

function formatarData(dateStr) {
  if (!dateStr) return ""
  const [y, m, d] = dateStr.split("-")
  return `${d}/${m}/${y}`
}

function labelDiasRestantes(dias) {
  if (dias <= 0) return "Vence hoje"
  if (dias === 1) return "Vence amanhã"
  return `${dias} dias`
}

function formatarSemana(domingo) {
  const seg = new Date(domingo)
  seg.setDate(seg.getDate() + 1)
  const dom = new Date(domingo)
  dom.setDate(dom.getDate() + 7)
  const opts = { day: "2-digit", month: "2-digit", year: "numeric" }
  return `${seg.toLocaleDateString("pt-BR", opts)} – ${dom.toLocaleDateString("pt-BR", opts)}`
}

function formatarDomingo(domingo) {
  return domingo.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })
}

function NomeDias({ dias }) {
  const nomes = DIAS_UTEIS.filter((d) => dias.includes(d.value)).map((d) => d.nome)
  return (
    <div className="flex flex-wrap gap-1">
      {nomes.map((nome) => (
        <span key={nome} className="text-[11px] bg-white border border-gray-200 text-slate-500 font-medium px-2 py-0.5 rounded-full">
          {nome}
        </span>
      ))}
    </div>
  )
}

function CardRecorrencia({ recorrencia, onRenovar, onDispensar }) {
  const urgencia = getUrgencia(recorrencia.diasRestantes)
  const estilo = URGENCIA[urgencia]

  return (
    <div className={`rounded-xl border ${estilo.border} ${estilo.bg} p-4 flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${estilo.dot}`} />
            <p className="text-[13px] font-semibold text-slate-800">{recorrencia.profissionalNome}</p>
          </div>
          <p className="text-[12px] text-slate-500 pl-4">{recorrencia.especialidade}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${estilo.badge}`}>
            {labelDiasRestantes(recorrencia.diasRestantes)}
          </span>
          <span className="text-[11px] text-slate-400">Vence {formatarData(recorrencia.dataFim)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[11px] bg-white border border-gray-200 text-blue-600 font-medium px-2 py-0.5 rounded-full">
          {recorrencia.horarioInicio}{recorrencia.horarioFim ? ` - ${recorrencia.horarioFim}` : ""}
        </span>
        <span className="text-[11px] bg-white border border-gray-200 text-slate-500 font-medium px-2 py-0.5 rounded-full">
          {recorrencia.tipo}
        </span>
      </div>

      <NomeDias dias={recorrencia.diasSemana} />

      <div className="mt-1 flex gap-2">
        <button
          onClick={() => onRenovar(recorrencia)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-600 hover:text-emerald-700 text-[12px] font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Renovar
        </button>
        <button
          onClick={() => onDispensar(recorrencia.recorrenciaId)}
          title="Dispensar notificação"
          className="flex items-center justify-center px-3 py-2 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function CardPaciente({ grupo, onRenovar, onDispensar }) {
  const minDias = grupo.recorrencias.reduce((min, r) => Math.min(min, r.diasRestantes), Infinity)
  const urgencia = getUrgencia(minDias)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className={`flex items-center justify-between px-5 py-4 border-b border-gray-100 ${URGENCIA[urgencia].headerBg}`}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[16px] font-bold shrink-0"
            style={{ background: "linear-gradient(135deg, #4fc3f7 0%, #5fcb9f 100%)" }}
          >
            {grupo.pacienteNome.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[15px] font-semibold text-slate-800">{grupo.pacienteNome}</p>
            <p className="text-[12px] text-slate-400">
              {grupo.recorrencias.length} recorrência{grupo.recorrencias.length !== 1 ? "s" : ""} vencendo esta semana
            </p>
          </div>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${URGENCIA[urgencia].badge}`}>
          {URGENCIA[urgencia].label}
        </span>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {grupo.recorrencias.map((rec) => (
          <CardRecorrencia
            key={rec.recorrenciaId}
            recorrencia={rec}
            onRenovar={onRenovar}
            onDispensar={onDispensar}
          />
        ))}
      </div>
    </div>
  )
}

export default function RecorrenciasAVencer() {
  const [grupos, setGrupos] = useState([])
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [recorrenciaSelecionada, setRecorrenciaSelecionada] = useState(null)
  const [pacienteNomeSelecionado, setPacienteNomeSelecionado] = useState("")
  const [modalDispensarAberto, setModalDispensarAberto] = useState(false)
  const [idParaDispensar, setIdParaDispensar] = useState(null)

  const carregarDados = () => {
    setLoading(true)
    listarRecorrenciasAVencer()
      .then(({ dados, ultimaAtualizacao: ultima }) => {
        setGrupos(dados)
        setUltimaAtualizacao(ultima)
      })
      .catch(() => toast.error("Erro ao carregar notificações."))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    carregarDados()
  }, [])

  const handleRenovar = (recorrencia, pacienteNome) => {
    setRecorrenciaSelecionada(recorrencia)
    setPacienteNomeSelecionado(pacienteNome)
    setModalAberto(true)
  }

  const handleDispensar = (recorrenciaId) => {
    setIdParaDispensar(recorrenciaId)
    setModalDispensarAberto(true)
  }

  const confirmarDispensar = async () => {
    try {
      await dispensarNotificacao(idParaDispensar)
      setGrupos((prev) =>
        prev
          .map((g) => ({ ...g, recorrencias: g.recorrencias.filter((r) => r.recorrenciaId !== idParaDispensar) }))
          .filter((g) => g.recorrencias.length > 0)
      )
      toast.success("Notificação dispensada.")
    } catch {
      toast.error("Erro ao dispensar notificação.")
    } finally {
      setIdParaDispensar(null)
    }
  }

  const totalRecorrencias = grupos.reduce((acc, g) => acc + g.recorrencias.length, 0)
  const urgentes = grupos.reduce(
    (acc, g) => acc + g.recorrencias.filter((r) => r.diasRestantes <= 1).length,
    0
  )

  return (
    <Layout>
      <div className="mx-[4%] my-[2%] w-[90%] flex flex-col gap-6">

        {/* Cabeçalho */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[22px] font-bold text-slate-800">Recorrências a Vencer</h1>
          {ultimaAtualizacao && (
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <p className="text-[12px] text-slate-500">
                Gerado automaticamente na {formatarDomingo(ultimaAtualizacao)}
                {" · "}
                <span className="font-medium text-slate-600">Semana: {formatarSemana(ultimaAtualizacao)}</span>
              </p>
            </div>
          )}
        </div>

        {/* Banner informativo */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3b82f6" className="w-4 h-4 mt-0.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-[12px] text-blue-700">
            Esta lista é atualizada todo domingo e exibe apenas as recorrências que vencem durante a semana corrente.
            Renove as consultas antes do vencimento para evitar interrupções no tratamento.
          </p>
        </div>

        {/* KPIs */}
        {!loading && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-1">
              <p className="text-[12px] text-slate-500 font-medium">Pacientes afetados</p>
              <p className="text-[28px] font-bold text-slate-800">{grupos.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-1">
              <p className="text-[12px] text-slate-500 font-medium">Recorrências esta semana</p>
              <p className="text-[28px] font-bold text-slate-800">{totalRecorrencias}</p>
            </div>
            <div className={`rounded-2xl border shadow-sm p-4 flex flex-col gap-1 ${urgentes > 0 ? "bg-red-50 border-red-100" : "bg-white border-gray-100"}`}>
              <p className={`text-[12px] font-medium ${urgentes > 0 ? "text-red-500" : "text-slate-500"}`}>
                Vencem hoje ou amanhã
              </p>
              <p className={`text-[28px] font-bold ${urgentes > 0 ? "text-red-600" : "text-slate-800"}`}>
                {urgentes}
              </p>
            </div>
          </div>
        )}

        {/* Lista */}
        {loading ? (
          <Loading message="Carregando notificações da semana..." />
        ) : grupos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[15px] font-medium">Nenhuma recorrência vencendo esta semana</p>
            <p className="text-[13px]">O cron será executado novamente no próximo domingo.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 pb-6">
            {grupos
              .slice()
              .sort((a, b) => {
                const minA = Math.min(...a.recorrencias.map((r) => r.diasRestantes))
                const minB = Math.min(...b.recorrencias.map((r) => r.diasRestantes))
                return minA - minB
              })
              .map((grupo) => (
                <CardPaciente
                  key={grupo.pacienteId}
                  grupo={grupo}
                  onRenovar={(rec) => handleRenovar(rec, grupo.pacienteNome)}
                  onDispensar={handleDispensar}
                />
              ))}
          </div>
        )}
      </div>

      <ModalRenovarRecorrencia
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        recorrencia={recorrenciaSelecionada}
        pacienteNome={pacienteNomeSelecionado}
        onSuccess={carregarDados}
      />

      <ConfirmacaoModal
        isOpen={modalDispensarAberto}
        onClose={() => setModalDispensarAberto(false)}
        onConfirm={confirmarDispensar}
        titulo="Dispensar notificação"
        mensagem="Tem certeza que deseja dispensar esta notificação? A consulta não será renovada."
        textoBotaoConfirmar="Dispensar"
        textoBotaoCancelar="Cancelar"
      />
    </Layout>
  )
}

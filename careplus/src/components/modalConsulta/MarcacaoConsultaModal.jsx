import React, { useEffect, useState } from "react"
import "./ConsultaModal.css"
import Modal from "react-modal"
import { buscarPacientePorNome, marcarConsultaRecorrente } from '@/src/service/agendamento/consulta.service'
import { listarFuncionariosConsulta } from '@/src/service/agendamento/agendamento.service'
import { toast } from "react-toastify"

Modal.setAppElement("#root")

const DIAS_UTEIS = [
  { label: 'S', value: 1, nome: 'Segunda' },
  { label: 'T', value: 2, nome: 'Terça' },
  { label: 'Q', value: 3, nome: 'Quarta' },
  { label: 'Q', value: 4, nome: 'Quinta' },
  { label: 'S', value: 5, nome: 'Sexta' },
]

// "yyyy-MM-dd" → "dd/MM/yyyy" (formato esperado pelo backend)
function ddmmyyyy(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

// Retorna a próxima ocorrência de um dia da semana no formato "dd/MM/yyyy"
// diaSemana: 1 = Segunda … 5 = Sexta
function proximaDoDia(diaSemana) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  let diff = (diaSemana - hoje.getDay() + 7) % 7
  if (diff === 0) diff = 7
  const data = new Date(hoje)
  data.setDate(data.getDate() + diff)
  const d = String(data.getDate()).padStart(2, '0')
  const m = String(data.getMonth() + 1).padStart(2, '0')
  return `${d}/${m}/${data.getFullYear()}`
}

function formatarData(dateStr) {
  return ddmmyyyy(dateStr)
}

function criarLinhaProfissional() {
  return { uid: crypto.randomUUID(), area: '', funcionarioId: '', funcionarioNome: '' }
}

let tiposCache = []

export default function CadastroFuncionarioModal({
  isOpen,
  onClose,
  events,
  dataSelecionada,
  horaSelecionada,
  pacientePreSelecionado = null,
  profissionalPreSelecionado = null,
  tiposDeConsulta = [],
}) {
  const [nome, setNome] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const [areas, setAreas] = useState([])
  const [funcionarios, setFuncionarios] = useState([])
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null)

  // Lista de profissionais da consulta em elaboração
  const [profissionais, setProfissionais] = useState([criarLinhaProfissional()])

  const [horario, setHorario] = useState('')
  const [horarioFim, setHorarioFim] = useState('')
  const [recorrente, setRecorrente] = useState(false)
  const [diasSelecionados, setDiasSelecionados] = useState([])
  const [dataTermino, setDataTermino] = useState('')
  const [dataConsulta, setDataConsulta] = useState(dataSelecionada || '')
  const [listaTipos, setListaTipos] = useState(() => tiposCache)
  const [tipoSelecionado, setTipoSelecionado] = useState('')
  const [consultas, setConsultas] = useState([])
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    listarFuncionariosConsulta().then(res => {
      const funcs = res.data
      setFuncionarios(funcs)
      const areasUnicas = [...new Set(funcs.map(f => f.especialidade).filter(Boolean))]
      setAreas(areasUnicas)
      setListaTipos(tiposCache)

      // Pré-selecionar profissional quando vier do filtro
      if (profissionalPreSelecionado?.id) {
        const func = funcs.find(f => f.id === profissionalPreSelecionado.id)
        if (func) {
          setProfissionais([{
            uid: crypto.randomUUID(),
            area: func.especialidade || '',
            funcionarioId: String(func.id),
            funcionarioNome: func.nome,
          }])
        }
      }
    }).catch(err => console.error(err))
  }, [isOpen])

  // Pré-selecionar paciente quando vier do filtro
  useEffect(() => {
    if (!isOpen) return
    if (pacientePreSelecionado?.id) {
      setPacienteSelecionado(pacientePreSelecionado)
      setNome(pacientePreSelecionado.nome || '')
    }
    if (dataSelecionada) setDataConsulta(dataSelecionada)
    if (horaSelecionada != null) {
      const h = String(horaSelecionada).padStart(2, '0')
      setHorario(`${h}:00`)
    }
  }, [isOpen])

  useEffect(() => {
    if (Array.isArray(tiposDeConsulta) && tiposDeConsulta.length > 0) {
      tiposCache = tiposDeConsulta
      setListaTipos(tiposDeConsulta)
    }
  }, [tiposDeConsulta])

  useEffect(() => {
    if (isOpen && nome?.length >= 2) {
      buscarPacientePorNome(nome).then(dados => setSugestoes(dados || []))
    } else {
      setSugestoes([])
    }
  }, [nome, isOpen])

  const resetForm = () => {
    setNome('')
    setPacienteSelecionado(null)
    setSugestoes([])
    setProfissionais([criarLinhaProfissional()])
    setHorario('')
    setHorarioFim('')
    setTipoSelecionado('')
    setRecorrente(false)
    setDiasSelecionados([])
    setDataTermino('')
    setDataConsulta('')
  }

  const handleClose = () => {
    resetForm()
    setConsultas([])
    onClose()
  }

  const toggleDia = (val) => {
    setDiasSelecionados(prev =>
      prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]
    )
  }

  // Handlers da lista de profissionais
  const handleAddProfissional = () => {
    setProfissionais(prev => [...prev, criarLinhaProfissional()])
  }

  const handleRemoveProfissional = (uid) => {
    setProfissionais(prev => prev.filter(p => p.uid !== uid))
  }

  const handleProfissionalAreaChange = (uid, newArea) => {
    setProfissionais(prev => prev.map(p =>
      p.uid === uid ? { ...p, area: newArea, funcionarioId: '', funcionarioNome: '' } : p
    ))
  }

  const handleProfissionalFuncChange = (uid, funcionarioId) => {
    const func = funcionarios.find(f => String(f.id) === funcionarioId)
    setProfissionais(prev => prev.map(p =>
      p.uid === uid ? { ...p, funcionarioId, funcionarioNome: func?.nome || '' } : p
    ))
  }

  const handleAdicionarConsulta = () => {
    if (!pacienteSelecionado?.id) return toast.error("Selecione um paciente.")
    if (profissionais.some(p => !p.funcionarioId)) return toast.error("Selecione todos os profissionais.")
    if (!horario) return toast.error("Informe o horário de início.")
    if (listaTipos.length > 0 && !tipoSelecionado) return toast.error("Selecione o tipo de consulta.")

    const nomesProfissionais = profissionais.map(p => p.funcionarioNome).join(', ')

    if (recorrente) {
      if (!diasSelecionados.length) return toast.error("Selecione pelo menos um dia da semana.")
      if (!dataTermino) return toast.error("Informe a data de término.")
      const nomeDias = DIAS_UTEIS.filter(d => diasSelecionados.includes(d.value)).map(d => d.nome).join(', ')
      setConsultas(prev => [...prev, {
        id: Date.now(),
        paciente: pacienteSelecionado,
        pacienteNome: pacienteSelecionado.nome,
        profissionais: [...profissionais],
        nomesProfissionais,
        horario,
        horarioFim,
        tipo: tipoSelecionado,
        recorrente: true,
        diasSemana: diasSelecionados,
        dataTermino,
        resumo: `${horario}${horarioFim ? ` - ${horarioFim}` : ''} · ${nomeDias} até ${formatarData(dataTermino)}`,
      }])
    } else {
      if (!dataConsulta) return toast.error("Informe a data da consulta.")
      setConsultas(prev => [...prev, {
        id: Date.now(),
        paciente: pacienteSelecionado,
        pacienteNome: pacienteSelecionado.nome,
        profissionais: [...profissionais],
        nomesProfissionais,
        horario,
        horarioFim,
        tipo: tipoSelecionado,
        recorrente: false,
        dataConsulta,
        resumo: `${horario}${horarioFim ? ` - ${horarioFim}` : ''} · ${formatarData(dataConsulta)}`,
      }])
    }
    resetForm()
    toast.success("Consulta adicionada à lista!")
  }

  const handleRemoverConsulta = (id) => {
    setConsultas(prev => prev.filter(c => c.id !== id))
  }

  const handleSalvar = async () => {
    if (!consultas.length) return toast.warning("Nenhuma consulta na lista.")
    setSalvando(true)

    // Agrupar por paciente para enviar uma requisição por paciente
    const porPaciente = {}
    for (const c of consultas) {
      const pid = c.paciente.id
      if (!porPaciente[pid]) porPaciente[pid] = { paciente: c.paciente, items: [] }

      const funcionarioIds = c.profissionais.map(p => Number(p.funcionarioId))

      if (c.recorrente) {
        // Um ConsultaItemRequestDto por dia da semana selecionado
        for (const dia of c.diasSemana) {
          const item = {
            funcionarioIds,
            horarioInicio: `${c.horario}:00`,
            dataInicio: proximaDoDia(dia),
            dataFim: ddmmyyyy(c.dataTermino),
            tipo: c.tipo,
          }
          if (c.horarioFim) item.horarioFim = `${c.horarioFim}:00`
          porPaciente[pid].items.push(item)
        }
      } else {
        const dt = ddmmyyyy(c.dataConsulta)
        const item = {
          funcionarioIds,
          horarioInicio: `${c.horario}:00`,
          dataInicio: dt,
          dataFim: dt,
          tipo: c.tipo,
        }
        if (c.horarioFim) item.horarioFim = `${c.horarioFim}:00`
        porPaciente[pid].items.push(item)
      }
    }

    let totalCriadas = 0
    let totalFalhas = 0

    for (const pid of Object.keys(porPaciente)) {
      const grp = porPaciente[pid]
      const payload = { pacienteId: Number(pid), consultas: grp.items }
      const res = await marcarConsultaRecorrente(payload)
      if (res) {
        totalCriadas += res.totalConsultasCriadas ?? 0
        totalFalhas += res.totalFalhas ?? 0
      } else {
        totalFalhas += grp.items.length
      }
    }

    setSalvando(false)
    if (totalFalhas === 0) {
      toast.success(`${totalCriadas} consulta(s) salva(s) com sucesso!`)
    } else if (totalCriadas > 0) {
      toast.warning(`${totalCriadas} salva(s), ${totalFalhas} com conflito ou erro.`)
    } else {
      toast.error("Nenhuma consulta pôde ser agendada.")
    }
    handleClose()
  }

  const fieldClass = "w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-700 outline-none focus:ring-2 focus:ring-blue-400/40 shadow-sm"
  const labelClass = "flex items-center gap-1.5 text-[13px] font-medium text-slate-600 mb-1.5"

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="modal-overlay"
      contentLabel="Nova Consulta"
    >
      <div className="relative w-full max-w-[820px] bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2B8BFF" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h2 className="text-[16px] font-semibold text-slate-800">Nova Consulta</h2>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">

          {/* Painel esquerdo: lista */}
          <div className="w-64 shrink-0 border-r border-gray-100 flex flex-col p-4 overflow-y-auto bg-gray-50/60">
            <p className="text-[13px] font-semibold text-slate-700 mb-0.5">Consultas adicionadas</p>
            <p className="text-[12px] text-blue-500 font-medium mb-3">
              {consultas.length} consulta{consultas.length !== 1 ? 's' : ''} na fila
            </p>
            <div className="flex flex-col gap-2">
              {consultas.length === 0 && (
                <p className="text-[12px] text-slate-400 text-center mt-6">Nenhuma consulta adicionada ainda</p>
              )}
              {consultas.map(c => (
                <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm relative">
                  <button
                    onClick={() => handleRemoverConsulta(c.id)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                  <div className="border-l-2 border-blue-500 pl-2">
                    <p className="text-[13px] font-semibold text-slate-800 pr-4">{c.pacienteNome}</p>
                    <p className="text-[11px] text-blue-500 font-medium truncate" title={c.nomesProfissionais}>{c.nomesProfissionais}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{c.resumo}</p>
                    {c.recorrente && (
                      <span className="inline-flex items-center gap-0.5 mt-1 text-[10px] text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        Recorrente
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Painel direito: formulário */}
          <div className="flex-1 overflow-y-auto p-5">

            {/* Paciente */}
            <div className="mb-4 relative">
              <label className={labelClass}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Paciente
              </label>
              <input
                type="text"
                placeholder="Nome do paciente"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value)
                  if (pacienteSelecionado) setPacienteSelecionado(null)
                }}
                className={fieldClass}
              />
              {sugestoes.length > 0 && (
                <ul className="absolute left-0 top-[calc(100%+2px)] z-50 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                  {sugestoes.map(p => (
                    <li
                      key={p.id}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setNome(p.nome)
                        setPacienteSelecionado(p)
                        setSugestoes([])
                      }}
                      className="px-3 py-2 text-[13px] text-slate-700 hover:bg-blue-50 cursor-pointer border-b last:border-none"
                    >
                      <span className="font-medium">{p.nome}</span>
                      <span className="text-slate-400 text-xs ml-2">{p.cpf}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Profissionais (múltiplos) */}
            <div className="mb-4">
              <label className={labelClass}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Profissionais
              </label>
              <div className="flex flex-col gap-2">
                {profissionais.map((prof) => (
                  <div key={prof.uid} className="flex gap-2 items-center">
                    {/* Área */}
                    <div className="relative flex-1">
                      <select
                        value={prof.area}
                        onChange={(e) => handleProfissionalAreaChange(prof.uid, e.target.value)}
                        className={`${fieldClass} appearance-none pr-8`}
                      >
                        <option value="">Área</option>
                        {areas.map((a, i) => <option key={i} value={a}>{a}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                    {/* Profissional */}
                    <div className="relative flex-1">
                      <select
                        value={prof.funcionarioId}
                        onChange={(e) => handleProfissionalFuncChange(prof.uid, e.target.value)}
                        disabled={!prof.area}
                        className={`${fieldClass} appearance-none pr-8 disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <option value="">Profissional</option>
                        {funcionarios.filter(f => f.especialidade === prof.area).map(f => (
                          <option key={f.id} value={f.id}>{f.nome}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                    {/* Remover linha (só quando há mais de 1) */}
                    {profissionais.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProfissional(prof.uid)}
                        title="Remover profissional"
                        className="p-2 text-slate-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddProfissional}
                  className="flex items-center gap-1.5 text-[12px] text-blue-500 hover:text-blue-700 font-medium mt-1 transition-colors cursor-pointer w-fit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Adicionar outro profissional
                </button>
              </div>
            </div>

            {/* Horários */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label className={labelClass}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Início
                </label>
                <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} className={fieldClass} />
              </div>
              <div className="flex-1">
                <label className={labelClass}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Término <span className="text-slate-400 font-normal text-[11px]">(opcional)</span>
                </label>
                <input type="time" value={horarioFim} onChange={(e) => setHorarioFim(e.target.value)} className={fieldClass} />
              </div>
            </div>

            {/* Tipo de Consulta */}
            {listaTipos.length > 0 && (
              <div className="mb-4">
                <label className={labelClass}>Tipo de Consulta</label>
                <div className="relative">
                  <select
                    value={tipoSelecionado}
                    onChange={(e) => setTipoSelecionado(e.target.value)}
                    className={`${fieldClass} appearance-none pr-8`}
                  >
                    <option value="">Selecione o tipo</option>
                    {listaTipos.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Toggle Recorrência */}
            <div className="mb-4">
              <label className={labelClass}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Recorrência
              </label>
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setRecorrente(r => !r)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${recorrente ? 'bg-blue-500' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${recorrente ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-[13px] text-slate-600">
                  {recorrente ? 'Semanal recorrente' : 'Consulta única'}
                </span>
              </div>
            </div>

            {/* Campos condicionais */}
            {recorrente ? (
              <>
                <div className="mb-4">
                  <label className="block text-[13px] font-medium text-slate-600 mb-2">Dia da semana</label>
                  <div className="flex gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm">
                    {DIAS_UTEIS.map(dia => (
                      <button
                        key={dia.value}
                        type="button"
                        title={dia.nome}
                        onClick={() => toggleDia(dia.value)}
                        className={`w-8 h-8 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                          diasSelecionados.includes(dia.value)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-slate-500 hover:bg-gray-200'
                        }`}
                      >
                        {dia.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[13px] font-medium text-slate-600 mb-1.5">Data de término</label>
                  <input
                    type="date"
                    value={dataTermino}
                    onChange={(e) => setDataTermino(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </>
            ) : (
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-slate-600 mb-1.5">Data da consulta</label>
                <input
                  type="date"
                  value={dataConsulta}
                  onChange={(e) => setDataConsulta(e.target.value)}
                  className={fieldClass}
                />
              </div>
            )}

            {/* Adicionar à lista */}
            <button
              type="button"
              onClick={handleAdicionarConsulta}
              className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium text-[13px] py-2.5 rounded-xl border border-blue-100 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Adicionar à lista
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={handleSalvar}
            disabled={salvando || consultas.length === 0}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer"
          >
            {salvando
              ? 'Salvando...'
              : `Salvar ${consultas.length} consulta${consultas.length !== 1 ? 's' : ''} na agenda`}
          </button>
        </div>
      </div>
    </Modal>
  )
}

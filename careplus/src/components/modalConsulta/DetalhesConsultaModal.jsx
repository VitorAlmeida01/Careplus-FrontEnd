import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { generateUUID } from '@/src/utils/uuid'
import { toast } from 'react-toastify'
import { editarConsulta, editarRecorrencia, deletarConsulta, deletarRecorrencia, listarEspecialidades, listarFuncionariosPorEspecialidade } from '@/src/service/agendamento/agendamento.service'
import './ConsultaModal.css'

Modal.setAppElement('#root')

const DIAS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

function formatarData(dateStr) {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return `${DIAS[dt.getDay()]}, ${d} de ${MESES[m - 1]} de ${y}`
}

function formatarHorario(inicio, fim) {
  const i = inicio ? inicio.substring(0, 5) : null
  const f = fim ? fim.substring(0, 5) : null
  if (i && f) return `${i} – ${f}`
  if (i) return i
  return '—'
}

function criarLinhaProfissional() {
  return { uid: generateUUID(), area: '', funcionarioId: '' }
}

export default function DetalhesConsultaModal({ isOpen, onClose, consulta, onUpdate, tiposDeConsulta = [] }) {
  const [modo, setModo] = useState('view') // 'view' | 'edit' | 'confirm-edit' | 'confirm-delete'
  const [salvando, setSalvando] = useState(false)
  const [form, setForm] = useState({ data: '', horarioInicio: '', horarioFim: '', tipo: '' })
  const [pendingBody, setPendingBody] = useState(null)
  const [profissionais, setProfissionais] = useState([criarLinhaProfissional()])
  const [areas, setAreas] = useState([])
  const [funcionariosPorArea, setFuncionariosPorArea] = useState({})

  const pacienteNome = consulta?.paciente?.nome ?? '—'
  const funcionarios = (() => {
    if (consulta?.funcionarios?.length) return consulta.funcionarios
    if (consulta?.consultaFuncionarios?.length)
      return consulta.consultaFuncionarios.map(cf => cf.funcionario ?? cf)
    if (consulta?.funcionario) return [consulta.funcionario]
    return []
  })()
  const tipo = consulta?.tipo

  useEffect(() => {
    listarEspecialidades().then(setAreas).catch(console.error)
  }, [])

  // Sync form when consulta changes or modal opens
  useEffect(() => {
    if (consulta && isOpen) {
      const funcs = (() => {
        if (consulta.funcionarios?.length) return consulta.funcionarios
        if (consulta.consultaFuncionarios?.length)
          return consulta.consultaFuncionarios.map(cf => cf.funcionario ?? cf)
        if (consulta.funcionario) return [consulta.funcionario]
        return []
      })()
      setForm({
        data: consulta.data ?? '',
        horarioInicio: consulta.horarioInicio ? consulta.horarioInicio.substring(0, 5) : '',
        horarioFim: consulta.horarioFim ? consulta.horarioFim.substring(0, 5) : '',
        tipo: consulta.tipo ?? '',
      })
      const linhas = funcs.length > 0
        ? funcs.map(f => ({ uid: generateUUID(), area: f.especialidade || '', funcionarioId: String(f.id) }))
        : [criarLinhaProfissional()]
      setProfissionais(linhas)
      linhas.forEach(l => {
        if (l.area) {
          listarFuncionariosPorEspecialidade(l.area).then(data =>
            setFuncionariosPorArea(prev => ({ ...prev, [l.area]: data }))
          ).catch(console.error)
        }
      })
      setModo('view')
    }
  }, [consulta, isOpen])

  function handleFormChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleProfissionalAreaChange(uid, newArea) {
    setProfissionais(prev => prev.map(p =>
      p.uid === uid ? { ...p, area: newArea, funcionarioId: '' } : p
    ))
    if (newArea && !funcionariosPorArea[newArea]) {
      listarFuncionariosPorEspecialidade(newArea).then(data =>
        setFuncionariosPorArea(prev => ({ ...prev, [newArea]: data }))
      ).catch(console.error)
    }
  }

  function handleProfissionalFuncChange(uid, funcionarioId) {
    setProfissionais(prev => prev.map(p =>
      p.uid === uid ? { ...p, funcionarioId } : p
    ))
  }

  function buildBody() {
    return {
      pacienteId: consulta.paciente?.id,
      funcionarioIds: profissionais.map(p => p.funcionarioId).filter(Boolean).map(Number),
      data: form.data,
      horarioInicio: form.horarioInicio.length === 5 ? form.horarioInicio + ':00' : form.horarioInicio,
      horarioFim: form.horarioFim ? (form.horarioFim.length === 5 ? form.horarioFim + ':00' : form.horarioFim) : null,
      tipo: form.tipo || undefined,
    }
  }

  function handleSalvarEdicao() {
    if (!form.data || !form.horarioInicio) {
      toast.error('Data e horário de início são obrigatórios.')
      return
    }
    const body = buildBody()
    if (consulta.recorrenciaId) {
      setPendingBody(body)
      setModo('confirm-edit')
    } else {
      executarSalvar(body)
    }
  }

  async function executarSalvar(body) {
    setSalvando(true)
    try {
      await editarConsulta(consulta.id, body)
      toast.success('Consulta atualizada com sucesso!')
      onUpdate?.()
      onClose()
    } catch {
      toast.error('Erro ao atualizar consulta.')
    } finally {
      setSalvando(false)
    }
  }

  async function handleSalvarSoEsta() {
    setSalvando(true)
    try {
      await editarConsulta(consulta.id, pendingBody)
      toast.success('Consulta atualizada com sucesso!')
      onUpdate?.()
      onClose()
    } catch {
      toast.error('Erro ao atualizar consulta.')
    } finally {
      setSalvando(false)
    }
  }

  async function handleSalvarRecorrencia() {
    setSalvando(true)
    try {
      await editarRecorrencia(consulta.recorrenciaId, pendingBody)
      toast.success('Série atualizada com sucesso!')
      onUpdate?.()
      onClose()
    } catch {
      toast.error('Erro ao atualizar série.')
    } finally {
      setSalvando(false)
    }
  }

  async function handleConfirmarDelete() {
    setSalvando(true)
    try {
      await deletarConsulta(consulta.id)
      toast.success('Consulta removida com sucesso!')
      onUpdate?.()
      onClose()
    } catch {
      toast.error('Erro ao remover consulta.')
    } finally {
      setSalvando(false)
    }
  }

  async function handleConfirmarDeleteRecorrencia() {
    setSalvando(true)
    try {
      await deletarRecorrencia(consulta.recorrenciaId)
      toast.success('Recorrência removida com sucesso!')
      onUpdate?.()
      onClose()
    } catch {
      toast.error('Erro ao remover recorrência.')
    } finally {
      setSalvando(false)
    }
  }

  function handleClose() {
    setModo('view')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="modal-overlay"
      contentLabel="Detalhes da Consulta"
    >
      {consulta && (
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2B8BFF" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h2 className="text-[16px] font-semibold text-slate-800">
              {modo === 'edit' ? 'Editar Consulta' : modo === 'confirm-edit' ? 'Editar Consulta' : modo === 'confirm-delete' ? 'Remover Consulta' : 'Detalhes da Consulta'}
            </h2>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {modo === 'view' && (
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-center gap-2">
              {tipo && (
                <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {tipo}
                </span>
              )}
            </div>

            {/* Paciente */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2B8BFF" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Paciente</p>
                <p className="text-[14px] font-semibold text-slate-800">{pacienteNome}</p>
              </div>
            </div>

            {/* Data e Horário */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#64748b" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" />
                  </svg>
                  <p className="text-[11px] text-slate-400 font-medium">Data</p>
                </div>
                <p className="text-[13px] font-semibold text-slate-800">{formatarData(consulta.data)}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#64748b" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[11px] text-slate-400 font-medium">Horário</p>
                </div>
                <p className="text-[13px] font-semibold text-slate-800">{formatarHorario(consulta.horarioInicio, consulta.horarioFim)}</p>
              </div>
            </div>

            {/* Profissionais */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#64748b" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <p className="text-[11px] text-slate-400 font-medium">
                  {funcionarios.length > 1 ? 'Profissionais' : 'Profissional'}
                </p>
              </div>
              {funcionarios.length === 0 ? (
                <p className="text-[13px] text-slate-500">—</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {funcionarios.map((f, i) => (
                    <div key={f.id ?? i} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {f.nome?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800 leading-tight">{f.nome}</p>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {[f.cargo, f.especialidade].filter(Boolean).join(' · ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Form */}
        {modo === 'edit' && (
          <div className="px-6 py-5 space-y-4">
            {/* Paciente (read-only) */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Paciente</p>
                <p className="text-[14px] font-semibold text-slate-800">{pacienteNome}</p>
              </div>
            </div>

            {/* Profissionais */}
            <div>
              <label className="block text-[12px] font-medium text-slate-500 mb-1">Profissionais</label>
              <div className="flex flex-col gap-2">
                {profissionais.map((prof) => (
                  <div key={prof.uid} className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <select
                        value={prof.area}
                        onChange={(e) => handleProfissionalAreaChange(prof.uid, e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-700 outline-none focus:ring-2 focus:ring-blue-300 appearance-none pr-8"
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
                    <div className="relative flex-1">
                      <select
                        value={prof.funcionarioId}
                        onChange={(e) => handleProfissionalFuncChange(prof.uid, e.target.value)}
                        disabled={!prof.area}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-700 outline-none focus:ring-2 focus:ring-blue-300 appearance-none pr-8 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Profissional</option>
                        {(funcionariosPorArea[prof.area] || []).map(f => (
                          <option key={f.id} value={f.id}>{f.nome}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                    {profissionais.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setProfissionais(prev => prev.filter(p => p.uid !== prof.uid))}
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
                  onClick={() => setProfissionais(prev => [...prev, criarLinhaProfissional()])}
                  className="flex items-center gap-1.5 text-[12px] text-blue-500 hover:text-blue-700 font-medium mt-1 transition-colors cursor-pointer w-fit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Adicionar outro profissional
                </button>
              </div>
            </div>

            {/* Data */}
            <div>
              <label className="block text-[12px] font-medium text-slate-500 mb-1">Data</label>
              <input
                type="date"
                name="data"
                value={form.data}
                onChange={handleFormChange}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Horários */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-medium text-slate-500 mb-1">Início</label>
                <input
                  type="time"
                  name="horarioInicio"
                  value={form.horarioInicio}
                  onChange={handleFormChange}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-slate-500 mb-1">Fim</label>
                <input
                  type="time"
                  name="horarioFim"
                  value={form.horarioFim}
                  onChange={handleFormChange}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-[12px] font-medium text-slate-500 mb-1">Tipo</label>
              {tiposDeConsulta.length > 0 ? (
                <select
                  name="tipo"
                  value={form.tipo}
                  onChange={handleFormChange}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Selecionar tipo</option>
                  {tiposDeConsulta.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="tipo"
                  value={form.tipo}
                  onChange={handleFormChange}
                  placeholder="Ex: Consulta, Retorno..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              )}
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {modo === 'confirm-delete' && (
          <div className="px-6 py-5 space-y-3">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-center">
              <p className="text-[14px] font-semibold text-red-700 mb-1">Remover consulta?</p>
              <p className="text-[12px] text-red-500">
                A consulta de <span className="font-semibold">{pacienteNome}</span> em{' '}
                <span className="font-semibold">{formatarData(consulta.data)}</span> será removida permanentemente.
              </p>
            </div>

            {consulta.recorrenciaId && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-[11px] font-semibold text-amber-700 mb-0.5">Esta consulta faz parte de uma recorrência</p>
                <p className="text-[11px] text-amber-600">Você pode remover apenas esta ou toda a série.</p>
              </div>
            )}
          </div>
        )}

        {/* Confirmação de edição */}
        {modo === 'confirm-edit' && (
          <div className="px-6 py-5 space-y-3">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
              <p className="text-[14px] font-semibold text-blue-700 mb-1">Editar consulta recorrente?</p>
              <p className="text-[12px] text-blue-500">
                Deseja editar apenas esta consulta ou todas as da série?
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-2">
          {modo === 'view' && (
            <>
              <button
                onClick={() => setModo('confirm-delete')}
                className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium text-[14px] rounded-xl transition-colors cursor-pointer border border-red-100"
              >
                Apagar
              </button>
              <button
                onClick={() => setModo('edit')}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer"
              >
                Editar
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </>
          )}
          {modo === 'edit' && (
            <>
              <button
                onClick={() => setModo('view')}
                disabled={salvando}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[14px] rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvarEdicao}
                disabled={salvando}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer disabled:opacity-60"
              >
                {salvando ? 'Salvando...' : 'Salvar'}
              </button>
            </>
          )}
          {modo === 'confirm-edit' && (
            <>
              <button
                onClick={() => setModo('edit')}
                disabled={salvando}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[14px] rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvarSoEsta}
                disabled={salvando}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer disabled:opacity-60"
              >
                {salvando ? 'Salvando...' : 'Só esta'}
              </button>
              <button
                onClick={handleSalvarRecorrencia}
                disabled={salvando}
                className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer disabled:opacity-60"
              >
                {salvando ? 'Salvando...' : 'Toda a série'}
              </button>
            </>
          )}
          {modo === 'confirm-delete' && (
            <>
              <button
                onClick={() => setModo('view')}
                disabled={salvando}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[14px] rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarDelete}
                disabled={salvando}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer disabled:opacity-60"
              >
                {salvando ? 'Removendo...' : 'Só esta'}
              </button>
              {consulta.recorrenciaId && (
                <button
                  onClick={handleConfirmarDeleteRecorrencia}
                  disabled={salvando}
                  className="flex-1 py-2.5 bg-red-800 hover:bg-red-900 text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer disabled:opacity-60"
                >
                  {salvando ? 'Removendo...' : 'Toda a série'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
      )}
    </Modal>
  )
}

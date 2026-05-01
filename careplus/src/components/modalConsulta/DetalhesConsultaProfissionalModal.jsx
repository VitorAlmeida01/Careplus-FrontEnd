import React, { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
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

export default function DetalhesConsultaProfissionalModal({ isOpen, onClose, consulta }) {
  const navigate = useNavigate()
  const [modo, setModo] = useState('view') // 'view' | 'confirm-iniciar'
  const [iniciando, setIniciando] = useState(false)

  const pacienteNome = consulta?.paciente?.nome ?? '—'
  const pacienteId = consulta?.paciente?.id
  const consultaId = consulta?.id

  const funcionarios = (() => {
    if (consulta?.funcionarios?.length) return consulta.funcionarios
    if (consulta?.consultaFuncionarios?.length)
      return consulta.consultaFuncionarios.map(cf => cf.funcionario ?? cf)
    if (consulta?.funcionario) return [consulta.funcionario]
    return []
  })()

  function handleClose() {
    setModo('view')
    onClose()
  }

  function handleFichaClinica() {
    if (!pacienteId) return
    handleClose()
    navigate(`/pacientes/ficha-clinica?idPaciente=${pacienteId}`)
  }

  async function handleConfirmarInicio() {
    setIniciando(true)
    try {
      handleClose()
      navigate(`/pacientes/consulta-atual?idConsulta=${consultaId}`)
    } finally {
      setIniciando(false)
    }
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
                {modo === 'confirm-iniciar' ? 'Iniciar Consulta' : 'Detalhes da Consulta'}
              </h2>
            </div>
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body — view */}
          {modo === 'view' && (
            <div className="px-6 py-5 space-y-4">
              {consulta.tipo && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {consulta.tipo}
                  </span>
                </div>
              )}

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

          {/* Body — confirmação de início */}
          {modo === 'confirm-iniciar' && (
            <div className="px-6 py-5 space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                <p className="text-[14px] font-semibold text-blue-700 mb-1">Iniciar esta consulta?</p>
                <p className="text-[12px] text-blue-600">
                  Paciente: <span className="font-semibold">{pacienteNome}</span>
                  <br />
                  Data: <span className="font-semibold">{formatarData(consulta.data)}</span>
                  <br />
                  Horário: <span className="font-semibold">{formatarHorario(consulta.horarioInicio, consulta.horarioFim)}</span>
                </p>
              </div>
              <p className="text-[12px] text-slate-400 text-center">
                Você será redirecionado para a tela de anotações da consulta.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-2">
            {modo === 'view' && (
              <>
                <button
                  onClick={handleFichaClinica}
                  disabled={!pacienteId}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[14px] rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  Ficha Clínica
                </button>
                <button
                  onClick={() => setModo('confirm-iniciar')}
                  disabled={!consultaId}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  Iniciar Consulta
                </button>
              </>
            )}
            {modo === 'confirm-iniciar' && (
              <>
                <button
                  onClick={() => setModo('view')}
                  disabled={iniciando}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[14px] rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmarInicio}
                  disabled={iniciando}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-[14px] rounded-xl transition-colors cursor-pointer disabled:opacity-60"
                >
                  {iniciando ? 'Iniciando...' : 'Confirmar'}
                </button>
              </>
            )}
          </div>

        </div>
      )}
    </Modal>
  )
}

import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import { toast } from "react-toastify"
import { renovarRecorrencia } from "../../../service/recorrencias/recorrencias.service"

Modal.setAppElement("#root")

const DIAS_UTEIS = [
  { label: "S", value: 1, nome: "Segunda" },
  { label: "T", value: 2, nome: "Terça" },
  { label: "Q", value: 3, nome: "Quarta" },
  { label: "Q", value: 4, nome: "Quinta" },
  { label: "S", value: 5, nome: "Sexta" },
]

export default function ModalRenovarRecorrencia({ isOpen, onClose, recorrencia, pacienteNome, onSuccess }) {
  const [diasSelecionados, setDiasSelecionados] = useState([])
  const [dataFim, setDataFim] = useState("")
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (isOpen && recorrencia) {
      setDiasSelecionados(recorrencia.diasSemana ?? [])
      setDataFim("")
    }
  }, [isOpen, recorrencia])

  const toggleDia = (val) => {
    setDiasSelecionados((prev) =>
      prev.includes(val) ? prev.filter((d) => d !== val) : [...prev, val]
    )
  }

  const handleClose = () => {
    onClose()
  }

  const handleSalvar = async () => {
    if (!diasSelecionados.length) return toast.error("Selecione pelo menos um dia da semana.")
    if (!dataFim) return toast.error("Informe a data de término.")

    setSalvando(true)
    try {
      await renovarRecorrencia(recorrencia.recorrenciaId, {
        diasSemana: diasSelecionados,
        dataFim,
      })
      toast.success("Recorrência renovada com sucesso!")
      onSuccess?.()
      handleClose()
    } catch {
      toast.error("Erro ao renovar recorrência.")
    } finally {
      setSalvando(false)
    }
  }

  if (!recorrencia) return null

  const fieldClass =
    "w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-700 outline-none focus:ring-2 focus:ring-blue-400/40 shadow-sm"
  const labelClass = "block text-[13px] font-medium text-slate-600 mb-1.5"

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="modal-overlay"
      contentLabel="Renovar Recorrência"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-slate-800">Renovar Recorrência</h2>
              <p className="text-[12px] text-slate-400">{pacienteNome}</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Info da recorrência */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-[12px] text-slate-500 mb-1">Profissional</p>
            <p className="text-[13px] font-semibold text-slate-700">{recorrencia.profissionalNome}</p>
            <p className="text-[12px] text-slate-400">{recorrencia.especialidade}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[11px] bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full">
                {recorrencia.horarioInicio}{recorrencia.horarioFim ? ` - ${recorrencia.horarioFim}` : ""}
              </span>
              <span className="text-[11px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full">
                {recorrencia.tipo}
              </span>
            </div>
          </div>

          {/* Dias da semana */}
          <div>
            <label className={labelClass}>Dias da semana</label>
            <div className="flex gap-2 bg-white border border-gray-200 rounded-xl px-3 py-3 shadow-sm">
              {DIAS_UTEIS.map((dia) => (
                <button
                  key={dia.value}
                  type="button"
                  title={dia.nome}
                  onClick={() => toggleDia(dia.value)}
                  className={`w-9 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
                    diasSelecionados.includes(dia.value)
                      ? "bg-blue-500 text-white shadow-sm"
                      : "bg-gray-100 text-slate-500 hover:bg-gray-200"
                  }`}
                >
                  {dia.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              {diasSelecionados.length === 0
                ? "Nenhum dia selecionado"
                : DIAS_UTEIS.filter((d) => diasSelecionados.includes(d.value))
                    .map((d) => d.nome)
                    .join(", ")}
            </p>
          </div>

          {/* Data de término */}
          <div>
            <label className={labelClass}>Nova data de término</label>
            <input
              type="date"
              value={dataFim}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDataFim(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleSalvar}
            disabled={salvando}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-[14px] rounded-xl transition-colors cursor-pointer"
          >
            {salvando ? "Salvando..." : "Confirmar Renovação"}
          </button>
        </div>
      </div>
    </Modal>
  )
}

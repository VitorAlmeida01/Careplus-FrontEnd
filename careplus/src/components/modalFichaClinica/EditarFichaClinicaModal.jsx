import React, { useEffect, useState } from "react"
import ModalBase from "./ModalBase"

export default function EditarFichaClinicaModal({ isOpen, onClose, dados }) {
  const [formData, setFormData] = useState({
    nome: dados?.nome || "Gabriel de Oliveira Santos",
    idade: dados?.fichaClinica?.idade || "12 Anos",
    anamnese:
      dados?.fichaClinica?.anamnese ||
      "Queixa principal, Hábitos de dormir até 10h02, Histórico médico: pé chato",
    diagnostico: dados?.fichaClinica?.diagnostico || "Imperatividade",
    planoTerapeutico: dados?.fichaClinica?.planoTerapeutico || "Não",
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Ficha clínica atualizada:", formData)
    onClose()
  }

  const inputClassName =
    "w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"

  const textareaClassName =
    "w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-none"

  const labelClassName = "block text-sm font-medium text-gray-600 mb-2"

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Ficha Clínica"
      icone="📋"
      largura="w-[550px]"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={labelClassName}>Nome:</label>
          <p className={inputClassName}>{formData.nome}</p>
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Idade:</label>
          <p className={inputClassName}>{formData.idade}</p>
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Anamnese:</label>
          <textarea
            value={formData.anamnese}
            onChange={(e) =>
              setFormData({ ...formData, anamnese: e.target.value })
            }
            className={textareaClassName}
            rows="4"
            placeholder="Queixa principal, histórico, etc."
          />
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Diagnóstico:</label>
          <input
            type="text"
            value={formData.diagnostico}
            onChange={(e) =>
              setFormData({ ...formData, diagnostico: e.target.value })
            }
            className={inputClassName}
            placeholder="Ex: Imperatividade"
          />
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Plano Terapêutico:</label>
          <textarea
            value={formData.planoTerapeutico}
            onChange={(e) =>
              setFormData({ ...formData, planoTerapeutico: e.target.value })
            }
            className={textareaClassName}
            rows="3"
            placeholder="Descreva o plano terapêutico"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 p-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 p-3 bg-linear-to-r from-blue-400 to-cyan-400 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Salvar
          </button>
        </div>
      </form>
    </ModalBase>
  )
}

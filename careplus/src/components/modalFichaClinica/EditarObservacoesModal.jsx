import React, { useState } from "react"
import ModalBase from "./ModalBase"

export default function EditarObservacoesModal({ isOpen, onClose, dados }) {
  const [formData, setFormData] = useState({
    medicacao: dados?.medicacao || "Não",
    atendimentoEspecial: dados?.atendimentoEspecial || "Lesivo",
    hiperfoco: dados?.hiperfoco || "Dinossauro",
    desfraldada: dados?.desfraldada || "Não",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Observações atualizadas:", formData)
    onClose()
  }

  const inputClassName =
    "w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"

  const labelClassName = "block text-sm font-medium text-gray-600 mb-2"

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Observações"
      icone="📝"
      largura="w-[500px]"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={labelClassName}>Medicação:</label>
          <input
            type="text"
            value={formData.medicacao}
            onChange={(e) =>
              setFormData({ ...formData, medicacao: e.target.value })
            }
            className={inputClassName}
            placeholder="Ex: Ritalina 10mg"
          />
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Atendimento Especial:</label>
          <input
            type="text"
            value={formData.atendimentoEspecial}
            onChange={(e) =>
              setFormData({ ...formData, atendimentoEspecial: e.target.value })
            }
            className={inputClassName}
            placeholder="Ex: Lesivo, Sensorial"
          />
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Hiperfoco:</label>
          <input
            type="text"
            value={formData.hiperfoco}
            onChange={(e) =>
              setFormData({ ...formData, hiperfoco: e.target.value })
            }
            className={inputClassName}
            placeholder="Ex: Dinossauro, Trens"
          />
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Desfraldada:</label>
          <select
            value={formData.desfraldada}
            onChange={(e) =>
              setFormData({ ...formData, desfraldada: e.target.value })
            }
            className={inputClassName}
          >
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
            <option value="Em processo">Em processo</option>
          </select>
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

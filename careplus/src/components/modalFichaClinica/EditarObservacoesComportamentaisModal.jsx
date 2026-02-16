import React, { useState } from "react"
import ModalBase from "./ModalBase"

export default function EditarObservacoesComportamentaisModal({
  isOpen,
  onClose,
  dados,
}) {
  const [observacoes, setObservacoes] = useState(
    dados?.observacoes ||
      "Mostrou-se colaborativo com as atividades propostas. Buscou contato visual. Solicitou o fone abafador quando um barulho alto ocorreu no corredor. Comunicou suas vontades através de frases curtas.",
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Observações comportamentais atualizadas:", observacoes)
    onClose()
  }

  const textareaClassName =
    "w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-none"

  const labelClassName = "block text-sm font-medium text-gray-600 mb-2"

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Observações Comportamentais"
      icone="📝"
      largura="w-[550px]"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={labelClassName}>Observações:</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className={textareaClassName}
            rows="8"
            placeholder="Digite as observações comportamentais do paciente..."
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

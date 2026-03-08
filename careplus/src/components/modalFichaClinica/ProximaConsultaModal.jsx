import React from "react"
import { useNavigate } from "react-router-dom"
import ModalBase from "./ModalBase"

export default function ProximaConsultaModal({ isOpen, onClose, dados }) {
  const navigate = useNavigate()

  const consultaData = {
    data: dados?.data || "15 de Novembro de 2025",
    horario: dados?.horario || "14:00 - 15:00",
    tipo: dados?.tipo || "Retorno",
    profissional: dados?.profissional || "Dr. Ana",
    tratamento: dados?.tratamento || "Voz",
  }

  const handleRealizarAnotacoes = () => {
    onClose()
    navigate("/consulta-atual")
  }

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      titulo="Próxima Consulta"
      icone="📅"
      largura="w-[600px]"
    >
      <div>
        <p className="text-center text-gray-600 mb-6">
          Informações do próximo agendamento
        </p>

        {/* Data e Horário - Fundo azul claro */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-blue-500 text-2xl">📅</div>
            <div>
              <p className="text-sm text-gray-600">Data</p>
              <p className="text-lg font-semibold text-gray-800">
                {consultaData.data}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-blue-500 text-2xl">🕐</div>
            <div>
              <p className="text-sm text-gray-600">Horário</p>
              <p className="text-lg font-semibold text-gray-800">
                {consultaData.horario}
              </p>
            </div>
          </div>
        </div>

        {/* Informações adicionais - grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Tipo</p>
            <p className="text-base font-semibold text-gray-800">
              {consultaData.tipo}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Profissional</p>
            <p className="text-base font-semibold text-gray-800">
              {consultaData.profissional}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Tratamento</p>
          <p className="text-base font-semibold text-gray-800">
            {consultaData.tratamento}
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 p-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={() =>{
              handleRealizarAnotacoes()

              navigate("/pacientes/consulta-atual")
            }}
            className="flex-1 p-3 bg-linear-to-r from-blue-400 to-cyan-400 text-white rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Realizar anotações
          </button>
        </div>
      </div>
    </ModalBase>
  )
}

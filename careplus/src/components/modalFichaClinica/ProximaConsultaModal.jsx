import {useEffect, useState } from "react"
import ModalBase from "./ModalBase"

export default function ProximaConsultaModal({
  isOpen,
  onClose,
  dados,
  onRealizarAnotacoes,
}) {

  const [proximaConsulta, setProximaConsulta] = useState({})

  useEffect(() =>{
    const formatarData = (dataIso) => {
      if (!dataIso || !String(dataIso).includes("-")) return "-"
      const partes = String(dataIso).split("-")
      return `${partes[2]}/${partes[1]}/${partes[0]}`
    }

    const formatarHorario = (inicio, fim) => {
      const inicioFormatado = inicio ? String(inicio).slice(0, 5) : "-"
      const fimFormatado = fim ? String(fim).slice(0, 5) : "-"
      return `${inicioFormatado} - ${fimFormatado}`
    }

    setProximaConsulta({
      consultaId: dados?.consultaId,
      data: formatarData(dados?.data),
      horario: formatarHorario(dados?.horarioInicio, dados?.horarioFim),
      tipo: dados?.tipo || "-",
      profissional: dados?.nomeProfissional || "-",
      tratamento: dados?.tratamento || "-",
    })
  }, [dados])

  const handleRealizarAnotacoes = () => {
    if (onRealizarAnotacoes) {
      onRealizarAnotacoes(proximaConsulta?.consultaId)
      return
    }

    onClose()
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
                {proximaConsulta.data || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-blue-500 text-2xl">🕐</div>
            <div>
              <p className="text-sm text-gray-600">Horário</p>
              <p className="text-lg font-semibold text-gray-800">
                {proximaConsulta.horario || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Tipo</p>
            <p className="text-base font-semibold text-gray-800">
              {proximaConsulta?.tipo || "-"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Profissional</p>
            <p className="text-base font-semibold text-gray-800">
              {proximaConsulta?.profissional || "-"}
            </p>
          </div>
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
            onClick={handleRealizarAnotacoes}
            className="flex-1 p-3 bg-linear-to-r from-blue-400 to-cyan-400 text-white rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Realizar anotações
          </button>
        </div>
      </div>
    </ModalBase>
  )
}

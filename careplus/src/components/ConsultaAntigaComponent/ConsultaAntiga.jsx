import { FileText, Calendar } from "lucide-react"

export default function ConsultaAntiga({
  titulo = "Retorno - Fonoaudiologia",
  data = "02/09/2025",
  horario = "16:00 - 17:00",
  profissional = "Dra. Ana Silva",
  tratamento = "Fonético",
  onVerDetalhes,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row items-start gap-3 md:gap-4 hover:shadow-md transition-shadow">
      {/* Ícone */}
      <div className="bg-blue-50 rounded-lg p-2 md:p-3 flex-shrink-0">
        <FileText size={20} className="text-blue-500 sm:w-6 sm:h-6" />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 w-full sm:w-auto">
        {/* Título */}
        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
          {titulo}
        </h3>

        {/* Data e Horário */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mb-1">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{data}</span>
          </div>
          <span>•</span>
          <span>{horario}</span>
          <span>•</span>
          <span>{profissional}</span>
        </div>

        {/* Tratamento */}
        {tratamento && (
          <div className="text-xs md:text-sm text-gray-700">
            <span>Tratamento: </span>
            <span className="font-medium">{tratamento}</span>
          </div>
        )}
      </div>

      {/* Botão Ver Detalhes */}
      <button
        onClick={onVerDetalhes}
        className="text-xs md:text-sm text-gray-600 border border-gray-300 rounded-md px-3 md:px-4 py-2 hover:bg-gray-50 transition-colors flex-shrink-0 w-full sm:w-auto cursor-pointer"
      >
        Ver detalhes
      </button>
    </div>
  )
}

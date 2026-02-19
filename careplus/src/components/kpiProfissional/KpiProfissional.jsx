import React from "react"
import { Clock, Check, ClipboardClock } from "lucide-react"

export default function KpiProfissional({
  titulo,
  valor,
  icone: Icon,
  corIcon = "bg-[#00B3D6]",
  corTexto = "text-gray-600",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 relative w-full md:min-w-50 hover:shadow-lg transition-shadow">
      <div
        className={`absolute top-5 right-5 ${corIcon} rounded-full p-3 flex items-center justify-center`}
      >
        {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />}
      </div>

      <div className="pr-14">
        <p className={`text-sm ${corTexto} mb-2`}>{titulo}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {valor}
        </h2>
      </div>
    </div>
  )
}

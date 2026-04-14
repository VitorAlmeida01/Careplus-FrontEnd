import { Calendar } from "lucide-react"

export default function FiltroAgenda() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-gray-700 font-medium">Filtros</span>

        <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-gray-50">
          <Calendar size={18} className="text-gray-400" />
          <input
            type="date"
            className="bg-transparent outline-none text-sm text-gray-600"
          />
        </div>

        <select className="border border-gray-200 rounded-full px-4 py-2 bg-gray-50 text-sm text-gray-600 outline-none">
          <option>Área</option>
          <option>Psicologia</option>
          <option>Fonoaudiologia</option>
          <option>Terapia Ocupacional</option>
        </select>

        <select className="border border-gray-200 rounded-full px-4 py-2 bg-gray-50 text-sm text-gray-600 outline-none">
          <option>Profissional</option>
          <option>Dra. Natália</option>
          <option>Dr. João</option>
        </select>

        <button className="bg-[#2B7FFF] hover:bg-[#1f5fe0] text-white text-sm px-5 py-2 rounded-full transition">
          Aplicar
        </button>
      </div>

      <button className="bg-[#00D492] hover:bg-[#00b67d] text-white px-6 py-2 rounded-full text-sm transition">
        + Nova Consulta
      </button>
    </div>
  )
}

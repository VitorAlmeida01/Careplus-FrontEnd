import { Clock, Check, X } from "lucide-react"

export default function ConfirmacaoAgenda() {
  const agendas = [
    {
      data: "08/10/2025",
      hora: "09:00 as 09:50",
      nome: "Gustavo Santos",
      idade: "11 Anos",
      tipo: "Convencional",
      profissional: "Dra Natalia",
    },
    {
      data: "09/10/2025",
      hora: "14:00 as 14:50",
      nome: "João Consultas",
      idade: "8 Anos",
      tipo: "Convencional",
      profissional: "Dra Natalia",
    },
  ]

  return (
    <div className="w-full lg:w-[50%] bg-white rounded-2xl shadow-xl p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-center mb-4 gap-3">
        <div className="flex items-center gap-3 align-center">
          <div className="bg-[#E6F7FF] p-2 rounded-xl">
            <Clock className="text-[#2B7FFF]" />
          </div>
          <div className="m-0 font-semibold text-gray-800 leading-none">
            Confirmar consultas
          </div>
        </div>

        <div className="flex items-center bg-gray-100 rounded-full p-2 gap-2">
          <button className="h-8 px-4 text-sm rounded-full bg-[#2B7FFF] text-white flex items-center justify-center">
            Você
          </button>
          <button className="h-8 py-4 text-sm rounded-full flex items-center justify-center text-gray-500">
            Todos
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {agendas.map((item, index) => (
          <div
            key={index}
            className="bg-[#F0FAFF] rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-gray-500">
                {item.data} • {item.hora}
              </span>
              <span className="font-medium text-gray-800">{item.nome}</span>
              <span className="text-gray-500">
                {item.tipo} | {item.idade}
              </span>
              <span className="text-gray-500">{item.profissional}</span>
              <a
                href="#"
                className="text-[#2B7FFF] text-sm hover:underline w-fit"
              >
                Ver Agenda
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition">
                <X size={16} />
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition">
                <Check size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

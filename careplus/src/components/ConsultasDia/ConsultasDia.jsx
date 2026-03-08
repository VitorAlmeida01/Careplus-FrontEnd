import React from "react"
import { useNavigate } from "react-router-dom"

export default function ConsultasDia() {
  const navigate = useNavigate()
  const consultas = [
    {
      id: 1,
      horario: "09:00 às 09:50",
      nome: "Gabriel de Oliveira Santos",
      tipo: "Convencional",
      idade: "12 Anos",
    },
    {
      id: 2,
      horario: "10:00 às 10:30",
      nome: "Vitor Almeida",
      tipo: "Outro",
      idade: "12 Anos",
    },
    {
      id: 3,
      horario: "11:00 às 11:50",
      nome: "Julia Santos",
      tipo: "Convencional",
      idade: "10 Anos",
    },
    {
      id: 4,
      horario: "11:00 às 11:50",
      nome: "Julia Santos",
      tipo: "Convencional",
      idade: "10 Anos",
    },
    {
      id: 5,
      horario: "11:00 às 11:50",
      nome: "Julia Santos",
      tipo: "Convencional",
      idade: "10 Anos",
    },
  ]

  return (
    <div className="w-full lg:w-[100%] bg-white p-5 md:p-8 pb-8 md:pb-11 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
      <h2 className="font-bold text-xl md:text-2xl text-center mb-6 md:mb-8 text-[#444]">
        Sua Agenda para Hoje
      </h2>

      {consultas.map((consulta) => (
        <div
          key={consulta.id}
          className="bg-[#f1f1f1] p-4 md:p-5 rounded-2xl mb-4 md:mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="text-left">
            <span className="text-sm font-semibold text-[#00a0ff] block mb-1">
              {consulta.horario}
            </span>
            <h3 className="text-lg font-semibold my-1">{consulta.nome}</h3>
            <p className="text-sm text-[#666] m-0">
              {consulta.tipo} - {consulta.idade}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            <button className="px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base rounded-xl border-2 border-[#00a0ff] bg-transparent text-[#00a0ff] cursor-pointer hover:bg-[#00a0ff] hover:text-white transition-colors" onClick={() => navigate('/consultas/ficha-clinica')}>
              Ver Prontuário
            </button>
            <button className="px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border-none rounded-xl cursor-pointer bg-linear-to-r from-[#00a0ff] to-[#00d48c] text-white hover:opacity-90 transition-opacity" onClick={() => navigate('/consultas/consulta-atual')}>
              Realizar Consulta
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

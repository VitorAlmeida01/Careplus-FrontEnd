import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout/Layout"
import ConsultaAntiga from "../../components/ConsultaAntigaComponent/ConsultaAntiga"

export default function ConsultasAntigas() {
  const navigate = useNavigate()

  const consultas = [
    {
      id: 1,
      titulo: "Retorno - Fonoaudiologia",
      data: "02/09/2025",
      horario: "16:00 - 17:00",
      profissional: "Dra. Ana Silva",
      tratamento: "Fonético",
    },
    {
      id: 2,
      titulo: "Retorno - Fonoaudiologia",
      data: "29/08/2025",
      horario: "15:00 - 16:00",
      profissional: "Dra. Ana Silva",
      tratamento: "Fonético",
    },
    {
      id: 3,
      titulo: "Consulta - Fonoaudiologia",
      data: "19/08/2025",
      horario: "16:00 - 17:00",
      profissional: "Dra. Ana Silva",
      tratamento: "Fonético",
    },
    {
      id: 4,
      titulo: "Avaliação - Fonoaudiologia",
      data: "12/08/2025",
      horario: "14:30 - 15:30",
      profissional: "Dra. Ana Silva",
      tratamento: "Fonoaudiologia",
    },
    {
      id: 5,
      titulo: "Triagem - Fonoaudiologia",
      data: "05/08/2025",
      horario: "16:00 - 17:00",
      profissional: "Dra. Ana Silva",
      tratamento: "",
    },
  ]

  return (
    <Layout>
      <div className="w-full h-full p-4 md:p-6 ">

        {/* Título com botão voltar */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-base md:text-xl font-medium text-gray-900">
            Últimas Consultas - Gabriel de Oliveira Santos
          </h1>
        </div>

        {/* Lista de consultas */}
        <div className="space-y-3 md:space-y-4 mx-auto">
          {consultas.map((consulta) => (
            <ConsultaAntiga
              key={consulta.id}
              titulo={consulta.titulo}
              data={consulta.data}
              horario={consulta.horario}
              profissional={consulta.profissional}
              tratamento={consulta.tratamento}
              onVerDetalhes={() =>
                console.log(`Ver detalhes da consulta ${consulta.id}`)
              }
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

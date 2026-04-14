import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Layout from "../../components/layout/Layout"
import ConsultaAntiga from "../../components/ConsultaAntigaComponent/ConsultaAntiga"
import DetalhesConsultaModal from "../../components/modalConsulta/DetalhesConsultaModal"

export default function ConsultasAntigas() {
  const navigate = useNavigate()
  const [modalAberto, setModalAberto] = useState(false)
  const [consultaSelecionada, setConsultaSelecionada] = useState(null)

  const consultas = [
    {
      id: 1,
      titulo: "Retorno - Fonoaudiologia",
      data: "02/09/2025",
      horario: "16:00 - 17:00",
      profissional: "Marcos Ribeiro",
      tratamento: "Fonoaudiologia",
      especialidade: "Fonoaudiologia",
      tipo: "Retorno",
      materiais: "Brinquedos de encaixe, Livro de histórias",
      observacoes: "Mostrou-se colaborativo com as atividades propostas. Buscou contato visual.\n\nSolicitou o fone abafador quando um barulho alto ocorreu no corredor. Comunicou suas vontades através de frases curtas."
    },
    {
      id: 2,
      titulo: "Retorno - Fonoaudiologia",
      data: "29/08/2025",
      horario: "15:00 - 16:00",
      profissional: "Marcos Ribeiro",
      tratamento: "Fonoaudiologia",
      especialidade: "Fonoaudiologia",
      tipo: "Retorno",
      materiais: "Cartões com imagens, Espelho",
      observacoes: "Participou ativamente dos exercícios articulatórios. Demonstrou boa evolução na pronúncia dos fonemas trabalhados."
    },
    {
      id: 3,
      titulo: "Consulta - Fonoaudiologia",
      data: "19/08/2025",
      horario: "16:00 - 17:00",
      profissional: "Marcos Ribeiro",
      tratamento: "Fonoaudiologia",
      especialidade: "Fonoaudiologia",
      tipo: "Consulta",
      materiais: "Jogos educativos, Material de apoio visual",
      observacoes: "Manteve-se concentrado durante toda a sessão. Apresentou dificuldade inicial, mas superou com incentivo."
    },
    {
      id: 4,
      titulo: "Avaliação - Fonoaudiologia",
      data: "12/08/2025",
      horario: "14:30 - 15:30",
      profissional: "Marcos Ribeiro",
      tratamento: "Fonoaudiologia",
      especialidade: "Fonoaudiologia",
      tipo: "Avaliação",
      materiais: "Protocolos de avaliação, Materiais diversos",
      observacoes: "Avaliação inicial realizada. Identificadas áreas de desenvolvimento prioritárias para o tratamento."
    },
    {
      id: 5,
      titulo: "Triagem - Fonoaudiologia",
      data: "05/08/2025",
      horario: "16:00 - 17:00",
      profissional: "Marcos Ribeiro",
      tratamento: "Fonoaudiologia",
      especialidade: "Fonoaudiologia",
      tipo: "Triagem",
      materiais: "Questionário de triagem",
      observacoes: "Primeiro contato. Paciente mostrou-se tímido, mas receptivo. Pais colaborativos durante a anamnese."
    },
  ]

  const abrirDetalhes = (consulta) => {
    setConsultaSelecionada(consulta)
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setConsultaSelecionada(null)
  }

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
              onVerDetalhes={() => abrirDetalhes(consulta)}
            />
          ))}
        </div>

        {/* Modal de Detalhes */}
        {consultaSelecionada && (
          <DetalhesConsultaModal
            isOpen={modalAberto}
            onClose={fecharModal}
            consulta={consultaSelecionada}
          />
        )}
      </div>
    </Layout>
  )
}

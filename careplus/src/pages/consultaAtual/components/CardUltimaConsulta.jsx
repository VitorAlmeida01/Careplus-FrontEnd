import { useState } from "react"
import DetalhesConsultaModal from "../../../components/modalConsulta/DetalhesConsultaModal"

export default function CardUltimaConsulta({
  data,
  tratamento
}) {
  const [modalAberto, setModalAberto] = useState(false)

  const abrirModal = () => {
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
  }

  const consultaData = {
    data: data,
    tratamento: tratamento,
    horario: '14:00 - 15:00',
    especialidade: tratamento,
    profissional: 'Dra. Mariana Costa Silva',
    tipo: 'Retorno',
    materiais: 'Brinquedos de encaixe, Livro de histórias, Cartões ilustrativos, Material sensorial',
    observacoes: 'Paciente demonstrou boa evolução desde a última sessão. Manteve-se concentrado durante as atividades propostas e mostrou-se colaborativo.\n\nConseguiu realizar os exercícios com maior autonomia, necessitando menos intervenções diretas. Respondeu bem aos estímulos visuais.\n\nRecomenda-se continuidade do tratamento com as mesmas estratégias, incrementando gradualmente o nível de complexidade das atividades.'
  }

  return (
    <>
      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center mb-[15px]">
          <h3 className="text-lg font-semibold text-gray-800">Última consulta</h3>
          <button 
            onClick={abrirModal}
            className="bg-white 
                 border border-[#00bfa5] 
                 text-[#00bfa5] 
                 py-[6px] px-5 
                 rounded-[6px] 
                 text-sm font-medium 
                 cursor-pointer
                 hover:bg-[#e0f7f4]">
            Ver
          </button>
        </div>

      <div className="flex flex-col gap-[15px] w-[95%]">
        <div className="flex-1 flex flex-col gap-[5px]">
          <span className="text-[13px] text-[#666] font-medium">Data:</span>
          <span className="text-sm text-[#333] font-normal">{data}</span>
        </div>
        <div className="flex-1 flex flex-col gap-[5px]">
          <span className="text-[13px] text-[#666] font-medium">Tratamento:</span>
          <span className="text-sm text-[#333] font-normal">{tratamento}</span>
        </div>
      </div>
    </div>

      <DetalhesConsultaModal
        isOpen={modalAberto}
        onClose={fecharModal}
        consulta={consultaData}
      />
    </>
  )
}

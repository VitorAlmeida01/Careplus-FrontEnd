import { useEffect, useMemo, useState } from "react"
import DetalhesConsultaAntigaModal from "../../../components/modalConsulta/DetalhesConsultaAntigaModal"
import { detalhesConsultaPorId } from "@/src/service/fichaClinica/fichaClinica.service"

export default function CardUltimaConsulta({
  consultaId,
  data,
  nomeFuncionario,
}) {
  const [modalAberto, setModalAberto] = useState(false)
  const [consultaDetalhes, setConsultaDetalhes] = useState(null)

  const consultaFallback = useMemo(() => ({
    data: data,
    horarioInicio: null,
    horarioFim: null,
    tipo: 'Retorno',
    nomeProfissional: nomeFuncionario,
    dadosPaciente: null,
  }), [data, nomeFuncionario])

  useEffect(() => {
    if (!modalAberto || !consultaId) return

    let cancelado = false

    detalhesConsultaPorId(consultaId)
      .then((response) => {
        if (!cancelado) setConsultaDetalhes(response || null)
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes da última consulta:", error)
        if (!cancelado) setConsultaDetalhes(null)
      })

    return () => { cancelado = true }
  }, [modalAberto, consultaId])

  return (
    <>
      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center mb-[15px]">
          <h3 className="text-lg font-semibold text-gray-800">Última consulta</h3>
          <button
            onClick={() => setModalAberto(true)}
            className="bg-white border border-[#00bfa5] text-[#00bfa5] py-[6px] px-5 rounded-[6px] text-sm font-medium cursor-pointer hover:bg-[#e0f7f4]"
          >
            Ver
          </button>
        </div>

        <div className="flex flex-col gap-[15px] w-[95%]">
          <div className="flex-1 flex flex-col gap-[5px]">
            <span className="text-[13px] text-[#666] font-medium">Data:</span>
            <span className="text-sm text-[#333] font-normal">{data}</span>
          </div>
          <div className="flex-1 flex flex-col gap-[5px]">
            <span className="text-[13px] text-[#666] font-medium">Funcionário:</span>
            <span className="text-sm text-[#333] font-normal">{nomeFuncionario}</span>
          </div>
        </div>
      </div>

      <DetalhesConsultaAntigaModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        consulta={consultaDetalhes || consultaFallback}
        mostrarObservacoesNoLugarProfissional
      />
    </>
  )
}

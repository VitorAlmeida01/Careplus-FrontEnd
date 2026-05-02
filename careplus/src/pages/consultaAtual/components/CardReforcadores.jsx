import { useEffect, useState } from "react"
import ModalReforcadores from "./ModalReforcadores"
import { adicionarMaterial, removerMaterial } from "@/src/service/agendamento/consulta.service"
import { toast } from "react-toastify"

export default function CardReforcadores({ idConsulta, reforcadoresIniciais = [] }) {
  const [reforcadores, setReforcadores] = useState(reforcadoresIniciais)
  const [modalReforcadorAberto, setModalReforcadorAberto] = useState(false)

  useEffect(() => {
    setReforcadores(reforcadoresIniciais)
  }, [reforcadoresIniciais])

  const handleAdicionar = async (nome) => {
    if (!nome.trim()) return
    try {
      const novo = await adicionarMaterial(idConsulta, nome)
      setReforcadores((prev) => [...prev, novo])
      setModalReforcadorAberto(false)
      toast.success("Reforçador adicionado!")
    } catch {
      toast.error("Erro ao adicionar reforçador.")
    }
  }

  const handleRemover = async (id) => {
    try {
      await removerMaterial(id)
      setReforcadores((prev) => prev.filter((r) => r.id !== id))
      toast.success("Reforçador removido!")
    } catch {
      toast.error("Erro ao remover reforçador.")
    }
  }

  return (
    <>
      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-[35px] h-[35px] rounded-[8px] flex items-center justify-center text-[18px] bg-[#00bfa5] text-white">✓</div>
          <h2 className="text-lg font-semibold text-gray-800">Reforçadores</h2>
        </div>

        <div className="flex flex-col gap-4 w-[95%]">
          <button
            onClick={() => setModalReforcadorAberto(true)}
            disabled={!idConsulta}
            className="bg-white border border-[#00bfa5] text-[#00bfa5] py-[6px] px-5 rounded-[6px] text-sm font-medium cursor-pointer hover:bg-[#e0f7f4] disabled:opacity-50 disabled:cursor-not-allowed">
            Adicionar
          </button>
          <ul className="list-none p-0">
            {reforcadores.map((reforcador) => (
              <li
                key={reforcador.id}
                className="py-2 pl-5 relative text-sm text-gray-700 flex items-center justify-between
                  before:content-['•'] before:absolute before:left-0 before:text-[#00bfa5] before:font-bold">
                <span>{reforcador.item}</span>
                <button
                  className="ml-2 text-red-500 cursor-pointer hover:text-red-700 text-xs"
                  onClick={() => handleRemover(reforcador.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ModalReforcadores
        aberto={modalReforcadorAberto}
        onClose={() => setModalReforcadorAberto(false)}
        onSalvar={handleAdicionar}
      />
    </>
  )
}

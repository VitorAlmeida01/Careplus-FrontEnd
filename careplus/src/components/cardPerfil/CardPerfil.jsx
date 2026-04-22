import logo from "/src/assets/logo.png"
import { useState } from "react"
import EditarCidModal from "../modalFichaClinica/EditarCidModal"

export default function CardPerfil({
  onContatoClick,
  onProximaConsultaClick,
  fichaClinica,
  onCidUpdated,
}) {
  const [modalCidOpen, setModalCidOpen] = useState(false)
  const nomePaciente = fichaClinica?.nome || "-"
  const idadePaciente = fichaClinica?.fichaClinica?.idade
  const idProntuario = fichaClinica?.fichaClinica?.id
  const cidPaciente = Array.isArray(fichaClinica?.cids) && fichaClinica.cids.length > 0
    ? fichaClinica.cids.map((item) => item.cid).filter(Boolean).join(", ") || "-"
    : "-"

  return (
    <div className="flex md:flex-row flex-col justify-between mb-2 gap-5  w-full items-center bg-[#FFFF] p-4 md:p-6 rounded-2xl shadow-xl md:w-full lg:w-full">
      <div className="flex gap-4">
        <img src={logo} alt="" className="w-16 md:w-20" />
        <div className="flex flex-col gap-3">
          <h2>{nomePaciente}</h2>
          <div className="flex gap-3">
            <p className="text-sm text-[#4B5563]">
              <b>Idade:</b> {idadePaciente ?? "-"} anos
            </p>
          </div>
          <div className="flex gap-3">
            <p className="text-sm text-[#4B5563]">
              <b>CID:</b> {cidPaciente}
            </p>
            <button
              type="button"
              onClick={() => setModalCidOpen(true)}
              className="text-xs border border-[#D1D5DC] rounded-lg px-2 py-0.5 bg-white hover:bg-[#F3F4F6]"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start h-full gap-3">
        <button
          onClick={onContatoClick}
          className="border border-[#D1D5DC] rounded-xl p-2 bg-white hover:bg-linear-to-r from-[#00B8DB] to-[#2B7FFF] hover:text-white cursor-pointer"
        >
          Contato
        </button>
        <button
          onClick={onProximaConsultaClick}
          className="border border-[#D1D5DC] rounded-xl p-2 bg-white hover:bg-linear-to-r from-[#00B8DB] to-[#2B7FFF] hover:text-white cursor-pointer"
        >
          Próxima Consulta
        </button>
      </div>

      <EditarCidModal
        isOpen={modalCidOpen}
        onClose={() => setModalCidOpen(false)}
        cids={fichaClinica?.cids}
        idProntuario={idProntuario}
        onCidUpdated={onCidUpdated}
      />
    </div>
  )
}

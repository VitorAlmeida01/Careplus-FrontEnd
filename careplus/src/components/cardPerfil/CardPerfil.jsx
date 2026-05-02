import logo from "/src/assets/logo.png"
import { useRef, useState } from "react"
import EditarCidModal from "../modalFichaClinica/EditarCidModal"
import ConfirmacaoModal from "../modalConfirmacao/ConfirmacaoModal"
import { atualizarFotoPaciente, buscarFotoPaciente } from "@/src/service/pacientes/pacientes.service"
import { toast } from "react-toastify"

export default function CardPerfil({
  onContatoClick,
  onProximaConsultaClick,
  fichaClinica,
  onCidUpdated,
  fotoPaciente,
  onFotoAtualizada,
}) {
  const [modalCidOpen, setModalCidOpen] = useState(false)
  const [modalFotoOpen, setModalFotoOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const inputRef = useRef(null)

  const nomePaciente = fichaClinica?.nome || "-"
  const idadePaciente = fichaClinica?.fichaClinica?.idade
  const idProntuario = fichaClinica?.fichaClinica?.id
  const cidPaciente = Array.isArray(fichaClinica?.cids) && fichaClinica.cids.length > 0
    ? fichaClinica.cids.map((item) => item.cid).filter(Boolean).join(", ") || "-"
    : "-"

  const handleFotoChange = (e) => {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    setArquivoSelecionado(arquivo)
    setPreviewUrl(URL.createObjectURL(arquivo))
    setModalFotoOpen(true)
    e.target.value = ""
  }

  const handleConfirmarFoto = async () => {
    if (!arquivoSelecionado || !fichaClinica?.cpf) return
    setUploading(true)
    try {
      await atualizarFotoPaciente(fichaClinica.cpf, arquivoSelecionado)
      const novaUrl = await buscarFotoPaciente(fichaClinica.cpf)
      onFotoAtualizada?.(novaUrl)
      toast.success("Foto atualizada!")
    } catch {
      toast.error("Erro ao atualizar foto.")
    } finally {
      setUploading(false)
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
      setArquivoSelecionado(null)
    }
  }

  const handleCancelarFoto = () => {
    URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setArquivoSelecionado(null)
  }

  return (
    <div className="flex md:flex-row flex-col justify-between mb-2 gap-5 w-full items-center bg-[#FFFF] p-4 md:p-6 rounded-2xl shadow-xl md:w-full lg:w-full">
      <div className="flex gap-4">
        <div className="relative group w-16 md:w-20 shrink-0">
          <img
            src={previewUrl || fotoPaciente || logo}
            alt=""
            className="w-16 md:w-20 h-16 md:h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
          >
            <span className="text-white text-xs font-medium">
              {uploading ? "..." : "Editar"}
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFotoChange}
          />
        </div>
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

      <ConfirmacaoModal
        isOpen={modalFotoOpen}
        onClose={() => { setModalFotoOpen(false); handleCancelarFoto() }}
        onConfirm={() => { setModalFotoOpen(false); handleConfirmarFoto() }}
        titulo="Atualizar foto"
        mensagem="Deseja usar esta foto para o paciente?"
        textoBotaoConfirmar="Confirmar"
        textoBotaoCancelar="Cancelar"
      />
    </div>
  )
}

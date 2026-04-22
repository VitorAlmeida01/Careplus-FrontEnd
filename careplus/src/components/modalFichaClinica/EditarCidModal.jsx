import React, { useState } from "react"
import ModalBase from "./ModalBase"
import { adicionarCid, removerCid } from "@/src/service/fichaClinica/fichaClinica.service"

export default function EditarCidModal({
  isOpen,
  onClose,
  cids,
  idProntuario,
  onCidUpdated,
}) {
  const [novoCid, setNovoCid] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const inputClassName =
    "w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"

  const labelClassName = "block text-sm font-medium text-gray-600 mb-2"

  const handleAdicionarCid = async () => {
    const cidLimpo = novoCid.trim()

    if (!cidLimpo || !idProntuario) return

    try {
      setIsSaving(true)
      await adicionarCid({ cid: cidLimpo, idProntuario })
      setNovoCid("")
      if (onCidUpdated) {
        await onCidUpdated()
      }
    } catch (error) {
      console.error("Erro ao adicionar CID:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoverCid = async (idCid) => {
    if (!idCid) return

    try {
      setIsSaving(true)
      await removerCid(idCid)
      if (onCidUpdated) {
        await onCidUpdated()
      }
    } catch (error) {
      console.error("Erro ao remover CID:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar CID"
      icone="🧾"
      largura="w-[540px]"
    >
      <div className="mb-6">
        <label className={labelClassName}>CIDs atuais:</label>
        {Array.isArray(cids) && cids.length > 0 ? (
          <section className="flex flex-col gap-2">
            {cids.map((cidItem) => (
              <div
                key={cidItem.id}
                className="flex items-center justify-between border border-gray-200 rounded-lg p-3"
              >
                <p className="text-sm text-gray-700">
                  <b>{cidItem.cid}</b>
                </p>
                <button
                  type="button"
                  onClick={() => handleRemoverCid(cidItem.id)}
                  disabled={isSaving}
                  className="px-3 py-1 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-60"
                >
                  Remover
                </button>
              </div>
            ))}
          </section>
        ) : (
          <p className="text-sm text-gray-500">Nenhum CID cadastrado.</p>
        )}
      </div>

      <div className="mb-6">
        <label className={labelClassName}>Adicionar CID:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={novoCid}
            onChange={(e) => setNovoCid(e.target.value)}
            className={inputClassName}
            placeholder="Ex: F84.0"
          />
          <button
            type="button"
            onClick={handleAdicionarCid}
            disabled={isSaving || !novoCid.trim() || !idProntuario}
            className="px-4 py-2 bg-linear-to-r from-blue-400 to-cyan-400 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 p-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Fechar
        </button>
      </div>
    </ModalBase>
  )
}

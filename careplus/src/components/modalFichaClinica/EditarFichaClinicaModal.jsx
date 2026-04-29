import React, { useEffect, useState } from "react"
import ModalBase from "./ModalBase"
import { atualizarFichaClinica } from "@/src/service/fichaClinica/fichaClinica.service"
import { toast } from 'react-toastify'

export default function EditarFichaClinicaModal({
  isOpen,
  onClose,
  dados,
  onSaved,
}) {
  const [formData, setFormData] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() =>{
      setFormData({
    idFicha: dados?.idFicha,
    idPaciente: dados?.idPaciente,
    convenio: dados?.convenio || "",
    hiperfoco: dados?.hiperfoco || "",
    desfraldado: dados?.desfraldado ?? false,
    atendimentoEspecial: dados?.atendimentoEspecial ?? "",
    resumoClinico: dados?.resumoClinico || "",
    anamnese: dados?.anamnese || "",
    diagnostico: dados?.diagnostico || "",
    nivelAgressividade: dados?.nivelAgressividade ?? 0,
  })
    }, [dados])


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSaving(true)
      await atualizarFichaClinica(formData.idFicha, {
        idPaciente: formData.idPaciente,
        desfraldado: Boolean(formData.desfraldado),
        hiperfoco: formData.hiperfoco,
        anamnese: formData.anamnese,
        diagnostico: formData.diagnostico,
        resumoClinico: formData.resumoClinico,
        nivelAgressividade: Number(formData.nivelAgressividade || 0),
      })

      if (onSaved) {
        await onSaved()
      }

      onClose()
      toast.success("Ficha clinica salva com sucesso")
    } catch (error) {
      console.error("Erro ao atualizar ficha clínica:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const inputClassName =
    "w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"

  const textareaClassName =
    "w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-none"

  const labelClassName = "block text-sm font-medium text-gray-600 mb-2"

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Ficha Clínica"
      icone="📋"
      largura="w-[550px]"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={labelClassName}>Convênio:</label>
          <p className={inputClassName}>{formData.convenio || "-"}</p>
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Anamnese:</label>
          <textarea
            value={formData.anamnese}
            onChange={(e) =>
              setFormData({ ...formData, anamnese: e.target.value })
            }
            className={textareaClassName}
            rows="4"
            placeholder="Queixa principal, histórico, etc."
          />
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Diagnóstico:</label>
          <input
            type="text"
            value={formData.diagnostico}
            onChange={(e) =>
              setFormData({ ...formData, diagnostico: e.target.value })
            }
            className={inputClassName}
            placeholder="Ex: Imperatividade"
          />
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Hiperfoco:</label>
          <input
            type="text"
            value={formData.hiperfoco}
            onChange={(e) =>
              setFormData({ ...formData, hiperfoco: e.target.value })
            }
            className={inputClassName}
            placeholder="Ex: Brinquedos"
          />
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Desfraldada:</label>
          <select
            value={String(formData.desfraldado)}
            onChange={(e) =>
              setFormData({
                ...formData,
                desfraldado: e.target.value === "true",
              })
            }
            className={inputClassName}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Atendimento Especial:</label>
          <input
            type="number"
            value={formData.nivelAgressividade}
            onChange={(e) =>
              setFormData({
                ...formData,
                nivelAgressividade: e.target.value,
                atendimentoEspecial: e.target.value,
              })
            }
            className={inputClassName}
            min="0"
          />
        </div>

        <div className="mb-4">
          <label className={labelClassName}>Observações Comportamentais:</label>
          <textarea
            value={formData.resumoClinico}
            onChange={(e) =>
              setFormData({
                ...formData,
                resumoClinico: e.target.value,
              })
            }
            className={textareaClassName}
            rows="4"
            placeholder="Descreva as observações comportamentais"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 p-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 p-3 bg-linear-to-r from-blue-400 to-cyan-400 text-white rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </ModalBase>
  )
}

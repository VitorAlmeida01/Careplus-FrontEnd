import React, { useEffect, useState } from "react"
import ModalBase from "./ModalBase"
import {
  adicionarMedicacao,
  atualizarMedicacao,
  removerMedicacao,
} from "@/src/service/fichaClinica/fichaClinica.service"

const formatarDataParaInput = (valor) => {
  if (!valor) return ""
  return String(valor).slice(0, 10)
}

export default function EditarMedicacoesModal({
  isOpen,
  onClose,
  medicacoes,
  idProntuario,
  onMedicacoesUpdated,
}) {
  const [isSaving, setIsSaving] = useState(false)
  const [medicacoesEdit, setMedicacoesEdit] = useState([])
  const [novaMedicacao, setNovaMedicacao] = useState({
    nomeMedicacao: "",
    dataInicio: "",
    dataFim: "",
    ativo: true,
  })

  useEffect(() => {
    const lista = Array.isArray(medicacoes)
      ? medicacoes.map((item) => ({
          idMedicacao: item.idMedicacao,
          nomeMedicacao: item.nomeMedicacao || "",
          dataInicio: formatarDataParaInput(item.dataInicio),
          dataFim: formatarDataParaInput(item.dataFim),
          ativo: item.ativo ?? true,
        }))
      : []

    setMedicacoesEdit(lista)
  }, [medicacoes])

  const inputClassName =
    "w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
  const labelClassName = "block text-sm font-medium text-gray-600 mb-2"

  const handleChangeMedicacao = (index, campo, valor) => {
    setMedicacoesEdit((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [campo]: valor } : item,
      ),
    )
  }

  const refreshDados = async () => {
    if (onMedicacoesUpdated) {
      await onMedicacoesUpdated()
    }
  }

  const handleSalvarMedicacao = async (item) => {
    if (!item.idMedicacao || !idProntuario || !item.nomeMedicacao?.trim()) return

    try {
      setIsSaving(true)
      await atualizarMedicacao(item.idMedicacao, {
        nomeMedicacao: item.nomeMedicacao.trim(),
        dataInicio: item.dataInicio || null,
        dataFim: item.dataFim || null,
        ativo: Boolean(item.ativo),
        idProntuario,
      })
      await refreshDados()
    } catch (error) {
      console.error("Erro ao atualizar medicação:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoverMedicacao = async (idMedicacao) => {
    if (!idMedicacao) return

    try {
      setIsSaving(true)
      await removerMedicacao(idMedicacao)
      await refreshDados()
    } catch (error) {
      console.error("Erro ao remover medicação:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAdicionarMedicacao = async () => {
    if (!idProntuario || !novaMedicacao.nomeMedicacao.trim()) return

    try {
      setIsSaving(true)
      await adicionarMedicacao({
        nomeMedicacao: novaMedicacao.nomeMedicacao.trim(),
        dataInicio: novaMedicacao.dataInicio || null,
        dataFim: novaMedicacao.dataFim || null,
        ativo: Boolean(novaMedicacao.ativo),
        idProntuario,
      })
      setNovaMedicacao({
        nomeMedicacao: "",
        dataInicio: "",
        dataFim: "",
        ativo: true,
      })
      await refreshDados()
    } catch (error) {
      console.error("Erro ao adicionar medicação:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      titulo="Editar Medicações"
      icone="💊"
      largura="w-[700px]"
    >
      <div className="mb-6">
        <label className={labelClassName}>Medicações atuais:</label>

        {medicacoesEdit.length > 0 ? (
          <section className="flex flex-col gap-4">
            {medicacoesEdit.map((item, index) => (
              <div
                key={item.idMedicacao}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClassName}>Nome</label>
                    <input
                      type="text"
                      value={item.nomeMedicacao}
                      onChange={(e) =>
                        handleChangeMedicacao(
                          index,
                          "nomeMedicacao",
                          e.target.value,
                        )
                      }
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Ativo</label>
                    <select
                      value={String(item.ativo)}
                      onChange={(e) =>
                        handleChangeMedicacao(index, "ativo", e.target.value === "true")
                      }
                      className={inputClassName}
                    >
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClassName}>Data Início</label>
                    <input
                      type="date"
                      value={item.dataInicio}
                      onChange={(e) =>
                        handleChangeMedicacao(index, "dataInicio", e.target.value)
                      }
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Data Fim</label>
                    <input
                      type="date"
                      value={item.dataFim}
                      onChange={(e) =>
                        handleChangeMedicacao(index, "dataFim", e.target.value)
                      }
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => handleSalvarMedicacao(item)}
                    disabled={isSaving || !item.nomeMedicacao.trim()}
                    className="px-4 py-2 bg-linear-to-r from-blue-400 to-cyan-400 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoverMedicacao(item.idMedicacao)}
                    disabled={isSaving}
                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-60"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <p className="text-sm text-gray-500">Nenhuma medicação cadastrada.</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <label className={labelClassName}>Adicionar medicação:</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className={labelClassName}>Nome</label>
            <input
              type="text"
              value={novaMedicacao.nomeMedicacao}
              onChange={(e) =>
                setNovaMedicacao((prev) => ({
                  ...prev,
                  nomeMedicacao: e.target.value,
                }))
              }
              className={inputClassName}
              placeholder="Ex: Dipirona"
            />
          </div>
          <div>
            <label className={labelClassName}>Ativo</label>
            <select
              value={String(novaMedicacao.ativo)}
              onChange={(e) =>
                setNovaMedicacao((prev) => ({
                  ...prev,
                  ativo: e.target.value === "true",
                }))
              }
              className={inputClassName}
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          <div>
            <label className={labelClassName}>Data Início</label>
            <input
              type="date"
              value={novaMedicacao.dataInicio}
              onChange={(e) =>
                setNovaMedicacao((prev) => ({
                  ...prev,
                  dataInicio: e.target.value,
                }))
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Data Fim</label>
            <input
              type="date"
              value={novaMedicacao.dataFim}
              onChange={(e) =>
                setNovaMedicacao((prev) => ({
                  ...prev,
                  dataFim: e.target.value,
                }))
              }
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={handleAdicionarMedicacao}
            disabled={isSaving || !novaMedicacao.nomeMedicacao.trim() || !idProntuario}
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

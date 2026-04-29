import React, { useEffect, useState } from "react"
import ModalBase from "./ModalBase"

export default function InformacoesContatoModal({ isOpen, onClose, dados }) {
const [formData, setFormData] = useState({
    nome: dados?.nome || "",
    parentesco: dados?.parentesco || "",
    telefone: dados?.telefone || "",
    email: dados?.email || "",
  endereco: {
    rua: dados?.endereco?.logradouro || "",
    numero: dados?.endereco?.numero || "",
    complemento: dados?.endereco?.complemento || "",
    bairro: dados?.endereco?.bairro || "",
    cidade: dados?.endereco?.cidade || "",
    cep: dados?.endereco?.cep || "",
  }
})

  useEffect(() =>{
    setFormData({
      nome: dados?.nome || "",
      parentesco: dados?.parentesco || "",
      telefone: dados?.telefone || "",
      email: dados?.email || "",
    endereco: {
      rua: dados?.endereco?.logradouro || "",
      numero: dados?.endereco?.numero || "",
      complemento: dados?.endereco?.complemento || "",
      bairro: dados?.endereco?.bairro || "",
      cidade: dados?.endereco?.cidade || "",
      cep: dados?.endereco?.cep || "",
    }
  })
  }, [dados])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para salvar os dados
    console.log("Dados do contato:", formData)
    onClose()
  }

  const inputClassName =
    "w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"

  const labelClassName = "block text-sm font-medium text-gray-600 mb-2"

  const sectionTitleClassName =
    "text-base font-semibold text-gray-700 mb-3 mt-4"

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      titulo="Informações de Contato"
      icone="📞"
      largura="w-[600px]"
    >
      <form onSubmit={handleSubmit}>
        {/* Responsável Principal */}
        <div className={sectionTitleClassName}>Responsável</div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClassName}>Nome:</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nome: e.target.value,
                })
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Parentesco:</label>
            <input
              type="text"
              value={formData.parentesco}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  parentesco: e.target.value,
                })
              }
              className={inputClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClassName}>Telefone:</label>
            <input
              type="text"
              value={formData.telefone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  telefone: e.target.value,
                })
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className={inputClassName}
            />
          </div>
        </div>


        {/* Endereço */}
        <div className={sectionTitleClassName}>Endereço</div>

        <div className="mb-4">
          <label className={labelClassName}>Rua:</label>
          <input
            type="text"
            value={formData.endereco.rua}
            onChange={(e) =>
              setFormData({
                ...formData,
                endereco: { ...formData.endereco, rua: e.target.value },
              })
            }
            className={inputClassName}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClassName}>Número:</label>
            <input
              type="text"
              value={formData.endereco.numero}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endereco: { ...formData.endereco, numero: e.target.value },
                })
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Complemento:</label>
            <input
              type="text"
              value={formData.endereco.complemento}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endereco: { ...formData.endereco, complemento: e.target.value },
                })
              }
              className={inputClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelClassName}>Bairro:</label>
            <input
              type="text"
              value={formData.endereco.bairro}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endereco: { ...formData.endereco, bairro: e.target.value },
                })
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Cidade:</label>
            <input
              type="text"
              value={formData.endereco.cidade}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endereco: { ...formData.endereco, cidade: e.target.value },
                })
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>CEP:</label>
            <input
              type="text"
              value={formData.endereco.cep}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endereco: { ...formData.endereco, cep: e.target.value },
                })
              }
              className={inputClassName}
            />
          </div>
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          className="w-full mt-4 p-3 bg-white border-black-500 border-1 to-cyan-400 text-black rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          Fechar
        </button>
      </form>
    </ModalBase>
  )
}

import React, { useState } from "react"
import ModalBase from "./ModalBase"

export default function InformacoesContatoModal({ isOpen, onClose, dados }) {
  const [formData, setFormData] = useState({
    responsavelPrincipal: {
      nome: dados?.responsavelPrincipal?.nome || "Maria de Oliveira Santos",
      parentesco: dados?.responsavelPrincipal?.parentesco || "Mãe",
      telefone: dados?.responsavelPrincipal?.telefone || "(11) 98765-4321",
      email: dados?.responsavelPrincipal?.email || "maria.santos@email.com",
    },
    responsavelSecundario: {
      nome: dados?.responsavelSecundario?.nome || "João de Oliveira Santos",
      parentesco: dados?.responsavelSecundario?.parentesco || "Pai",
      telefone: dados?.responsavelSecundario?.telefone || "(11) 98765-1234",
      email: dados?.responsavelSecundario?.email || "joao.santos@email.com",
    },
    endereco: {
      rua: dados?.endereco?.rua || "Rua das Flores, 123 - Apto 45",
      bairro: dados?.endereco?.bairro || "Jardim Paulista",
      cidade: dados?.endereco?.cidade || "São Paulo",
      cep: dados?.endereco?.cep || "01234-567",
    },
  })

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
        <div className={sectionTitleClassName}>Responsável Principal</div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClassName}>Nome:</label>
            <input
              type="text"
              value={formData.responsavelPrincipal.nome}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  responsavelPrincipal: {
                    ...formData.responsavelPrincipal,
                    nome: e.target.value,
                  },
                })
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Parentesco:</label>
            <input
              type="text"
              value={formData.responsavelPrincipal.parentesco}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  responsavelPrincipal: {
                    ...formData.responsavelPrincipal,
                    parentesco: e.target.value,
                  },
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
              value={formData.responsavelPrincipal.telefone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  responsavelPrincipal: {
                    ...formData.responsavelPrincipal,
                    telefone: e.target.value,
                  },
                })
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Email:</label>
            <input
              type="email"
              value={formData.responsavelPrincipal.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  responsavelPrincipal: {
                    ...formData.responsavelPrincipal,
                    email: e.target.value,
                  },
                })
              }
              className={inputClassName}
            />
          </div>
        </div>

        {/* Responsável Secundário */}
        <div className={sectionTitleClassName}>Responsável Secundário</div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClassName}>Nome:</label>
            <input
              type="text"
              value={formData.responsavelSecundario.nome}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  responsavelSecundario: {
                    ...formData.responsavelSecundario,
                    nome: e.target.value,
                  },
                })
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Parentesco:</label>
            <input
              type="text"
              value={formData.responsavelSecundario.parentesco}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  responsavelSecundario: {
                    ...formData.responsavelSecundario,
                    parentesco: e.target.value,
                  },
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
              value={formData.responsavelSecundario.telefone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  responsavelSecundario: {
                    ...formData.responsavelSecundario,
                    telefone: e.target.value,
                  },
                })
              }
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Email:</label>
            <input
              type="email"
              value={formData.responsavelSecundario.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  responsavelSecundario: {
                    ...formData.responsavelSecundario,
                    email: e.target.value,
                  },
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
          className="w-full mt-4 p-3 bg-linear-to-r from-blue-400 to-cyan-400 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          Enviar
        </button>
      </form>
    </ModalBase>
  )
}

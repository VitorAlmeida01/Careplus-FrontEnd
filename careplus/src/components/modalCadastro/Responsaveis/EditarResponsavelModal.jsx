import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import logo from "/src/assets/logo.png"
import ConfirmacaoModal from "../../modalConfirmacao/ConfirmacaoModal"

Modal.setAppElement("#root")

export default function EditarResponsavelModal({
  isOpen,
  onClose,
  responsavel,
  onSave,
}) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    dtNascimento: "",
    cpf: "",
  })
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false)

  useEffect(() => {
    if (responsavel) {
      setFormData({
        nome: responsavel.nome || "",
        email: responsavel.email || "",
        telefone: responsavel.telefone || "",
        dtNascimento: responsavel.dtNascimento || "",
        cpf: responsavel.cpf || "",
      })
    }
  }, [responsavel])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setModalConfirmacaoAberto(true)
  }

  const confirmarSalvar = () => {
    if (onSave) {
      onSave(formData)
    }
    setModalConfirmacaoAberto(false)
    onClose()
  }

  const overlayClassName =
    "fixed top-0 left-0 w-full h-full bg-black/45 flex justify-center items-center backdrop-blur-sm z-[9999]"

  const modalCardClassName =
    "w-[450px] bg-white px-[35px] pt-[35px] pb-[45px] rounded-[25px] relative text-center shadow-2xl"

  const closeBtnClassName =
    "absolute top-[18px] right-[18px] text-[28px] border-none bg-transparent cursor-pointer text-gray-500 hover:text-gray-700"

  const logoClassName = "w-[110px]"

  const h2ClassName = "font-medium mt-[15px] mb-[25px] text-gray-700"

  const modalFieldClassName = "mb-5 text-left flex flex-col"

  const labelClassName = "flex text-sm mb-1.5 text-gray-600 font-medium"

  const inputClassName =
    "w-full p-4 border border-gray-400 bg-gray-100 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"

  const btnSubmitClassName =
    "w-full p-4 mt-2.5 rounded-xl cursor-pointer bg-gradient-to-r from-[#00a0ff] to-[#00d48c] text-white text-base font-medium hover:opacity-90 transition-opacity"

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={modalCardClassName}
        overlayClassName={overlayClassName}
        contentLabel="Editar Responsavel"
      >
        <button className={closeBtnClassName} onClick={onClose}>
          ×
        </button>

        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className={logoClassName} />
        </div>
        <h2 className={h2ClassName}>Visualizar e Editar Responsavel</h2>

        <form onSubmit={handleSubmit}>
          <div className={modalFieldClassName}>
            <label className={labelClassName}>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div className={modalFieldClassName}>
            <label className={labelClassName}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div className={modalFieldClassName}>
            <label className={labelClassName}>CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div className={modalFieldClassName}>
            <label className={labelClassName}>Data de Nascimento</label>
            <input
              type="date"
              name="dtNascimento"
              value={formData.dtNascimento}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div className={modalFieldClassName}>
            <label className={labelClassName}>Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <button type="submit" className={btnSubmitClassName}>
            Salvar Alteracoes
          </button>
        </form>
      </Modal>

      <ConfirmacaoModal
        isOpen={modalConfirmacaoAberto}
        onClose={() => setModalConfirmacaoAberto(false)}
        onConfirm={confirmarSalvar}
        titulo="Confirmar Alteracoes"
        mensagem="Tem certeza que deseja salvar as alteracoes do responsavel?"
        textoBotaoConfirmar="Salvar"
        textoBotaoCancelar="Cancelar"
      />
    </>
  )
}

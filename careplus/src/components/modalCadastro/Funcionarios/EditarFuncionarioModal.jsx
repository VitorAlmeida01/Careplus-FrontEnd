import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import "./CadastroModal.css"
import logo from "/src/assets/logo.png"
import ConfirmacaoModal from "../../modalConfirmacao/ConfirmacaoModal"

// Configuração para acessibilidade
Modal.setAppElement("#root")

export default function EditarFuncionarioModal({ isOpen, onClose, funcionario, onSave }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    documento: "",
    cargo: "",
    telefone: "",
    supervisor: ""
  })
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false)

  // Atualiza os dados do formulário quando o funcionário mudar
  useEffect(() => {
    if (funcionario) {
      setFormData({
        nome: funcionario.nome || "",
        email: funcionario.email || "",
        documento: funcionario.documento || "",
        cargo: funcionario.cargo || "",
        telefone: funcionario.telefone || "",
        supervisor: funcionario.supervisor?.nome || ""
      })
    }
  }, [funcionario])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  // Classes Tailwind
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
      contentLabel="Editar Funcionário"
    >
      <button className={closeBtnClassName} onClick={onClose}>
        ×
      </button>

      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" className={logoClassName} />
      </div>
      <h2 className={h2ClassName}>Editar Funcionário</h2>

      <form onSubmit={handleSubmit}>
        <div className={modalFieldClassName}>
          <label className={labelClassName}>Nome Completo</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite o nome completo"
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
            placeholder="email@exemplo.com"
            className={inputClassName}
          />
        </div>

        <div className={modalFieldClassName}>
          <label className={labelClassName}>Documento</label>
          <input
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            placeholder="CPF ou RG"
            className={inputClassName}
          />
        </div>

        <div className={modalFieldClassName}>
          <label className={labelClassName}>Cargo</label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            placeholder="Ex: Médico, Recepcionista"
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
            placeholder="(00) 00000-0000"
            className={inputClassName}
          />
        </div>

        <div className={modalFieldClassName}>
          <label className={labelClassName}>Supervisor</label>
          <select
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            className={inputClassName}
          >
            <option value="">Selecione um supervisor (opcional)</option>
            <option value="Dr. João Silva">Dr. João Silva</option>
            <option value="Dra. Maria Santos">Dra. Maria Santos</option>
            <option value="Dr. Pedro Costa">Dr. Pedro Costa</option>
          </select>
        </div>

        <button type="submit" className={btnSubmitClassName}>
          Salvar Alterações
        </button>
      </form>
    </Modal>

    <ConfirmacaoModal
      isOpen={modalConfirmacaoAberto}
      onClose={() => setModalConfirmacaoAberto(false)}
      onConfirm={confirmarSalvar}
      titulo="Confirmar Alterações"
      mensagem="Tem certeza que deseja salvar as alterações ao editar o funcionário?"
      textoBotaoConfirmar="Salvar"
      textoBotaoCancelar="Cancelar"
    />
    </>
  )
}

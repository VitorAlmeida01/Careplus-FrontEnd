import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import "./CadastroModal.css"
import { atualizarPaciente } from "../../../service/pacientes/pacientes.service"
import { toast } from "react-toastify"

Modal.setAppElement("#root")

export default function EditarPacienteModal({ isOpen, onClose, onSuccess, paciente }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    dtNascimento: "",
    convenio: "",
  })

  useEffect(() => {
    if (paciente) {
      setForm({
        nome: paciente.nome || "",
        email: paciente.email || "",
        cpf: paciente.cpf || "",
        telefone: paciente.telefone || "",
        dtNascimento: paciente.dtNascimento || "",
        convenio: paciente.convenio || "",
      })
    }
  }, [paciente])

  const overlayClassName =
    "fixed top-0 left-0 w-full h-full bg-black/45 flex justify-center items-center backdrop-blur-sm z-[9999]"

  const modalCardClassName =
    "w-[450px] bg-white px-[35px] pt-[35px] pb-[45px] rounded-[25px] relative text-center shadow-2xl"

  const closeBtnClassName =
    "absolute top-[18px] right-[18px] text-[28px] border-none bg-transparent cursor-pointer text-gray-500 hover:text-gray-700"

  const h2ClassName = "font-medium mt-[15px] mb-[25px] text-gray-700"

  const modalFieldClassName = "mb-5 text-left flex flex-col"

  const labelClassName = "flex text-sm mb-1.5 text-gray-600 font-medium"

  const inputClassName =
    "w-full p-4 border border-gray-400 bg-gray-100 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"

  const inputDisabledClassName =
    "w-full p-4 border border-gray-300 bg-gray-200 rounded-lg text-[15px] text-gray-500 cursor-not-allowed"

  const btnSubmitClassName =
    "w-full p-4 mt-2.5 rounded-xl cursor-pointer bg-gradient-to-r from-[#00a0ff] to-[#00d48c] text-white text-base font-medium hover:opacity-90 transition-opacity"

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await atualizarPaciente(paciente.id, form)
      toast.success("Paciente atualizado com sucesso!")
      onSuccess()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error("Não foi possível atualizar o paciente")
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={modalCardClassName}
      overlayClassName={overlayClassName}
      contentLabel="Editar Paciente"
    >
      <button className={closeBtnClassName} onClick={onClose}>×</button>
      <form onSubmit={handleSubmit}>
        <h2 className={h2ClassName}>Editar Paciente</h2>

        <div className={modalFieldClassName}>
          <label className={labelClassName}>Nome Completo</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </div>

        <div className={modalFieldClassName}>
          <label className={labelClassName}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </div>

        <div className={modalFieldClassName}>
          <label className={labelClassName}>CPF</label>
          <input
            type="text"
            name="cpf"
            value={form.cpf}
            disabled
            className={inputDisabledClassName}
          />
        </div>

        <div className={modalFieldClassName}>
          <label className={labelClassName}>Telefone</label>
          <input
            type="text"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div className={modalFieldClassName}>
          <label className={labelClassName}>Data de Nascimento</label>
          <input
            type="date"
            name="dtNascimento"
            value={form.dtNascimento}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </div>

        <div className={modalFieldClassName}>
          <label className={labelClassName}>Convênio</label>
          <input
            type="text"
            name="convenio"
            value={form.convenio}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <button type="submit" className={btnSubmitClassName}>
          Salvar alterações
        </button>
      </form>
    </Modal>
  )
}

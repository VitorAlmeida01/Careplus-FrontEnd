import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import logo from "/src/assets/logo.png"
import { listarSupervisores, cadastrarFuncionario } from '@/src/service/funcionarios/funcionarios.service'
import { toast } from "react-toastify"

Modal.setAppElement("#root")

export default function CadastroFuncionarioModal({ isOpen, onClose }) {
  const [supervisores, setSupervisores] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    supervisor: "",
    cargo: "",
    especialidade: "",
    telefone: "",
    documento: "",
    tipoAtendimento: "",
    foto: null,
  })

  useEffect(() => {
    const response = async () => {
      const supervisores = await listarSupervisores()
      setSupervisores(supervisores)
    }
    response()
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "foto") {
      setForm((prev) => ({ ...prev, foto: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    if (!form.nome || !form.email || !form.senha || !form.cargo || !form.documento) {
      toast.warn("Preencha todos os campos obrigatórios!")
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("nome", form.nome)
      formData.append("email", form.email)
      formData.append("senha", form.senha)
      formData.append("cargo", form.cargo)
      formData.append("especialidade", form.especialidade)
      formData.append("telefone", form.telefone)
      formData.append("documento", form.documento)
      formData.append("tipoAtendimento", form.tipoAtendimento)

      if (form.supervisor) {
        formData.append("supervisor.id", form.supervisor)
      }

      if (form.foto) {
        formData.append("foto", form.foto)
      }

      await cadastrarFuncionario(formData)
      toast.success("Funcionário cadastrado com sucesso!")
      onClose()
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cadastrar. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // const overlayClassName =
  //   "fixed top-0 left-0 w-full h-full bg-black/45 flex justify-center items-center backdrop-blur-sm z-[9999]"
  const overlayClassName =
  "fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-[9999]"
  const modalCardClassName =
    "w-[450px] max-h-[90vh] overflow-y-auto bg-white px-[35px] pt-[35px] pb-[45px] rounded-[25px] relative text-center shadow-2xl"
  const closeBtnClassName =
    "absolute top-[18px] right-[18px] text-[28px] border-none bg-transparent cursor-pointer text-gray-500 hover:text-gray-700"
  const logoClassName = "w-[110px]"
  const h2ClassName = "font-medium mt-[15px] mb-[25px] text-gray-700"
  const modalFieldClassName = "mb-5 text-left flex flex-col"
  const labelClassName = "flex text-sm mb-1.5 text-gray-600 font-medium"
  const inputClassName =
    "w-full p-4 border border-gray-400 bg-gray-100 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
  const btnSubmitClassName =
    "w-full p-4 mt-2.5 rounded-xl cursor-pointer bg-gradient-to-r from-[#00a0ff] to-[#00d48c] text-white text-base font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={modalCardClassName}
      overlayClassName={overlayClassName}
      contentLabel="Cadastro de Funcionário"
    >
      <button className={closeBtnClassName} onClick={onClose}>×</button>

      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" className={logoClassName} />
      </div>
      <h2 className={h2ClassName}>Cadastro de Funcionário</h2>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Nome Completo *</label>
        <input name="nome" type="text" placeholder="Digite o nome completo"
          className={inputClassName} value={form.nome} onChange={handleChange} />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Email *</label>
        <input name="email" type="email" placeholder="email@exemplo.com"
          className={inputClassName} value={form.email} onChange={handleChange} />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Senha *</label>
        <input name="senha" type="password" placeholder="••••••"
          className={inputClassName} value={form.senha} onChange={handleChange} />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Cargo *</label>
        <input name="cargo" type="text" placeholder="Ex: Médico, Recepcionista"
          className={inputClassName} value={form.cargo} onChange={handleChange} />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Especialidade</label>
        <input name="especialidade" type="text" placeholder="Ex: Fonoaudióloga"
          className={inputClassName} value={form.especialidade} onChange={handleChange} />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Documento (RG) *</label>
        <input name="documento" type="text" placeholder="Ex: 134122241"
          className={inputClassName} value={form.documento} onChange={handleChange} />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Telefone</label>
        <input name="telefone" type="text" placeholder="(00) 00000-0000"
          className={inputClassName} value={form.telefone} onChange={handleChange} />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Tipo de Atendimento</label>
        <input name="tipoAtendimento" type="text" placeholder="Ex: ABA, Fono, TO, etc"
          className={inputClassName} value={form.tipoAtendimento} onChange={handleChange} />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Supervisor</label>
        <select name="supervisor" className={inputClassName} value={form.supervisor} onChange={handleChange}>
          <option value="">Selecione um supervisor (opcional)</option>
          {supervisores.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.id}>{supervisor.nome}</option>
          ))}
        </select>
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Foto</label>
        <input name="foto" type="file" accept="image/*"
          className={inputClassName} onChange={handleChange} />
      </div>

      <button className={btnSubmitClassName} onClick={handleSubmit} disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </Modal>
  )
}
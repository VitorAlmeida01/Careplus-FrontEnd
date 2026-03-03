import React from "react"
import Modal from "react-modal"
import "./CadastroModal.css"
import logo from "/src/assets/logo.png"
import { cadastrarPaciente } from "../../../service/pacientes/pacientes.service"
import { toast } from 'react-toastify'

// Configuração para acessibilidade
Modal.setAppElement("#root")

export default function CadastroPacienteModal({ isOpen, onClose, onSuccess }) {
  // Classes Tailwind equivalentes ao CSS
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

    // const [formData, setFormData] = useState({
    //   nomeCompleto: "",
    //   email: "",
    //   documento: "",
    //   telefoneResponsavel: "",
    //   dataNascimento: ""
    // })

    function handleSubmit(event) {
      event.preventDefault()
      
      const dados = {
        nome: event.target.nomeCompleto.value,
        email: event.target.email.value,
        cpf: event.target.documento.value,
        telefone: event.target.telefoneResponsavel.value,
        dtNascimento: event.target.dataNascimento.value,
        convenio: event.target.convenio.value
      }

      console.log("Enviando para o banco de dados:", dados)

      cadastrarPaciente(dados).then(() => {
        toast.success('Paciente cadastrado!')
        onSuccess()
        onClose()
      }).catch((error) => {
        console.error(error)
        toast.error('Não foi possível cadastrar o paciente')
      })

      // setFormData(dados)

    }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={modalCardClassName}
      overlayClassName={overlayClassName}
      contentLabel="Cadastro de Paciente"
    >
      <button className={closeBtnClassName} onClick={onClose}>
        ×
      </button>
      <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" className={logoClassName} />
      </div>
      <h2 className={h2ClassName}>Cadastro de Paciente</h2>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Nome Completo</label>
        <input
          type="text"
          placeholder="Digite o nome completo"
          name="nomeCompleto"
          // value={formData.nomeCompleto} 
          className={inputClassName}
        />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Email</label>
        <input
          type="email"
          placeholder="email@exemplo.com"
          className={inputClassName}
          name="email"
          // value={formData.email}
        />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Documento</label>
        <input
          type="text"
          placeholder="Ex: CPF, RG"
          className={inputClassName}
          name="documento"
          // value={formData.documento}
        />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Telefone Responsável</label>
        <input
          type="text"
          placeholder="(00) 00000-0000"
          className={inputClassName}
          name="telefoneResponsavel"
          // value={formData.telefoneResponsavel}
        />
      </div>

            <div className={modalFieldClassName}>
        <label className={labelClassName}>Data de Nascimento</label>
        <input
          type="text"
          placeholder="dd/mm/aaaa"
          className={inputClassName}
          name="dataNascimento"
          // value={formData.dataNascimento}
        />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Convênio</label>
        <input
          type="text"
          placeholder="Nome do convênio"
          className={inputClassName}
          name="convenio"
          // value={formData.convenio}
        />
      </div>

      <button className={btnSubmitClassName} type="submit">
        Cadastrar
      </button>
      </form>

    </Modal>
  )
}

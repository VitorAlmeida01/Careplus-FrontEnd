import React from "react"
import Modal from "react-modal"
import logo from "/src/assets/logo.png"

// Configuração para acessibilidade
Modal.setAppElement("#root")

export default function CadastroFuncionarioModal({ isOpen, onClose }) {
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={modalCardClassName}
      overlayClassName={overlayClassName}
      contentLabel="Cadastro de Funcionário"
    >
      <button className={closeBtnClassName} onClick={onClose}>
        ×
      </button>

      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" className={logoClassName} />
      </div>
      <h2 className={h2ClassName}>Cadastro de Funcionário</h2>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Nome Completo</label>
        <input
          type="text"
          placeholder="Digite o nome completo"
          className={inputClassName}
        />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Email</label>
        <input
          type="email"
          placeholder="email@exemplo.com"
          className={inputClassName}
        />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Cargo</label>
        <input
          type="text"
          placeholder="Ex: Médico, Recepcionista"
          className={inputClassName}
        />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Telefone</label>
        <input
          type="text"
          placeholder="(00) 00000-0000"
          className={inputClassName}
        />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Supervisor</label>
        <select className={inputClassName}>
          <option>Selecione um supervisor (opcional)</option>
        </select>
      </div>

      {/* 

     ----------------------------- Aqui eu estava pensando em colocar senha, mas talvez nao seja seguro, então deixei comentado por enquanto -----------------------------

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Senha</label>
        <input type="password" placeholder="••••••" className={inputClassName} />
      </div>

      <div className={modalFieldClassName}>
        <label className={labelClassName}>Confirmar Senha</label>
        <input type="password" placeholder="••••••" className={inputClassName} />
      </div>
      
      */}

      <button className={btnSubmitClassName}>Cadastrar</button>
    </Modal>
  )
}

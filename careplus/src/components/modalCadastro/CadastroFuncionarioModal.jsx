import React from "react"
import Modal from "react-modal"
import "./CadastroModal.css"
import logo from "/src/assets/logo.png"

// Configuração para acessibilidade
Modal.setAppElement("#root")

export default function CadastroFuncionarioModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-card"
      overlayClassName="modal-overlay"
      contentLabel="Cadastro de Funcionário"
    >
      <button className="close-btn-modal" onClick={onClose}>
        ×
      </button>

      <img src={logo} alt="logo" className="modal-logo" />
      <h2>Cadastro de Funcionário</h2>

      <div className="modal-field">
        <label>Nome Completo</label>
        <input type="text" placeholder="Digite o nome completo" />
      </div>

      <div className="modal-field">
        <label>Email</label>
        <input type="email" placeholder="email@exemplo.com" />
      </div>

      <div className="modal-field">
        <label>Cargo</label>
        <input type="text" placeholder="Ex: Médico, Recepcionista" />
      </div>

      <div className="modal-field">
        <label>Telefone</label>
        <input type="text" placeholder="(00) 00000-0000" />
      </div>

      <div className="modal-field">
        <label>Supervisor</label>
        <select>
          <option>Selecione um supervisor (opcional)</option>
        </select>
      </div>

      {/* 

     ----------------------------- Aqui eu estava pensando em colocar senha, mas talvez nao seja seguro, então deixei comentado por enquanto -----------------------------

      <div className="modal-field">
        <label>Senha</label>
        <input type="password" placeholder="••••••" />
      </div>

      <div className="modal-field">
        <label>Confirmar Senha</label>
        <input type="password" placeholder="••••••" />
      </div>
      
      */}

      <button className="btn-submit">Cadastrar</button>
    </Modal>
  )
}

import React from "react";
import "./CadastroModal.css";
import logo from "../assets/logo.png";

export default function CadastroFuncionarioModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <button className="close-btn" onClick={onClose}>×</button>

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
          <label>CPF</label>
          <input type="text" placeholder="000.000.000-00" />
        </div>

        <div className="modal-field">
          <label>Telefone</label>
          <input type="text" placeholder="(00) 00000-0000" />
        </div>

        <div className="modal-field">
          <label>Cargo</label>
          <input type="text" placeholder="Ex: Médico, Recepcionista" />
        </div>

        <div className="modal-field">
          <label>Setor</label>
          <input type="text" placeholder="Fonoaudiologia" />
        </div>

        <div className="modal-field">
          <label>Supervisor</label>
          <select>
            <option>Selecione um supervisor (opcional)</option>
          </select>
        </div>

        <div className="modal-field-checkbox">
          <input type="checkbox" id="adminCheckbox" />Não possui supervisor / é supervisor
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
      </div>
    </div>
  );
}

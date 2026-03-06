import React from "react"
import "./ConsultaModal.css"
import Modal from "react-modal"

// Configuração para acessibilidade
Modal.setAppElement("#root")

export default function CadastroFuncionarioModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="modal-overlay"
      contentLabel="Marcação de Consulta"
    >
      <div className="flex flex-col max-h-[90vh] relative w-full max-w-[500px] mx-auto p-0 border border-[#1eaafc] rounded-lg overflow-hidden bg-[#f1f1f1] flex flex-col">
      
        <div className="p-6">
            <button className="absolute top-4 right-5 text-3xl font-light text-gray-400 hover:text-red-600 transition-colors duration-200 cursor-pointer"
             onClick={onClose}>
            ×
          </button>
          <h2 className="text-3xl font-black text-center">Marcação de Consulta</h2>
          <h3 className="text-sm text-center text-gray-600 mt-1">Preencha as informações para agendar uma nova consulta</h3>
          
        </div>

        
        <div className="overflow-y-auto flex-1 pt-6 px-6">
          
          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Paciente *</label>
            <input type="text" placeholder="Digite o nome ou CPF" />
          </div>

          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Área *</label>
            <select>
              <option selected disabled>Selecione a área</option>
            </select>
          </div>

          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Profissional de Preferência</label>
            <select>
              <option selected disabled>Selecione a área primeiro</option>
            </select>
          </div>

          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Data *</label>
            <input type="date" placeholder="Selecione uma data" />
          </div>

          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Horário *</label>
            <select>
              <option selected disabled>Selecione o horário</option>
            </select>
          </div>

          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Tipo de Consulta *</label>
            <select>
              <option selected disabled>Selecione o tipo de consulta</option>
            </select>
          </div>
          <hr className="mb-5 border-0 h-px bg-black/15 shadow-[0_1px_4px_rgba(0,0,0,0.25)]"/>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-[0_3px_3px_0_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-3 mb-2">
              <input type="checkbox" id="recorrencia" className="w-4 h-4 cursor-pointer" />
              <label htmlFor="recorrencia" className="text-1xl font-bold text-gray-700 tracking-tighter mb-1cursor-pointer">
                Recorrência de Consulta
              </label>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed text-left ml-7">
              Selecione as datas adicionais em que esta consulta deve se repetir. O sistema verificará a disponibilidade de todos os profissionais
            </p>
          </div>

          <div className="modal-field mt-5">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Adicionar Data de Recorrência</label>
            <input type="date" placeholder="Selecione uma data" />
            <button className="p-2 mt-[10px] border-0 rounded-[12px] cursor-pointer bg-gradient-to-r from-[#00a0ff] to-[#00d48c] text-white text-[12px]">+ Adicionar Data</button>
          </div>

          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Datas de Recorrência Selecionadas</label>
            <h6 className="text-xs text-gray-600">Nenhuma data adicionada ainda</h6>
          </div>

        </div>

        
        <div className="p-6">
          <button className="btn-submit w-full">Salvar e Enviar para Aprovação</button>
        </div>
      </div>
    </Modal>
  )
}

import React from "react"
import Modal from "react-modal"
import "./modalConsultasHoje.css"

Modal.setAppElement("#root")

export default function ConsultasHojeModal({ isOpen, onClose }){
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-card"
      overlayClassName="modal-overlay"
      contentLabel="Consultas de Hoje"
    >
      <button className="close-btn-modal" onClick={onClose}>
        ×
      </button>

      <h2>Sua Agenda para Hoje</h2>

      <div className="consulta-item">
        <div className="consulta-info">
          <span className="consulta-horario">09:00 às 09:50</span>
          <h3>Gabriel de Oliveira Santos</h3>
          <p>Convencional - 12 Anos</p>
        </div>

        <div className="consulta-buttons">
          <button className="btn-outline">Ver Prontuário</button>
          <button className="btn-submit">Realizar Consulta</button>
        </div>
      </div>

      <div className="consulta-item">
        <div className="consulta-info">
          <span className="consulta-horario">10:00 às 10:30</span>
          <h3>Vitor Almeida</h3>
          <p>Outro - 12 Anos</p>
        </div>

        <div className="consulta-buttons">
          <button className="btn-outline">Ver Prontuário</button>
          <button className="btn-submit">Realizar Consulta</button>
        </div>
      </div>

      <div className="consulta-item">
        <div className="consulta-info">
          <span className="consulta-horario">11:00 às 11:50</span>
          <h3>Julia Santos</h3>
          <p>Convencional - 10 Anos</p>
        </div>

        <div className="consulta-buttons">
          <button className="btn-outline">Ver Prontuário</button>
          <button className="btn-submit">Realizar Consulta</button>
        </div>
      </div>

    </Modal>
  )
}

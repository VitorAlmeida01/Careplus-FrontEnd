import React from 'react'
import Modal from 'react-modal'
import agendaWhite from '/src/assets/agenda_white.png'
import relogio from '/src/assets/relogio.png'
import AgendaBlue from '/src/assets/agenda_azu.png'

Modal.setAppElement('#root')

export default function IniciarConsultaModal({ isOpen, onClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content h-[75%] w-1/3 bg-white rounded-xl"
            overlayClassName="modal-overlay"
        >
            <div className="flex flex-col justify-end items-center text-wrap gap-2 h-[40%]">
                <div className='w-full h-1/6 flex flex-row justify-end items-center'>
                    <button className="w-1/10 ml-115 text-3xl hover:bg-blue-100 rounded-lg" onClick={onClose}>×</button>
                </div>
                <div className='w-1/6 h-1/2 flex justify-center items-center bg-linear-to-r from-[#00b7db] to-[#2b80ff] rounded-xl'>
                    <img src={agendaWhite} className='w-[40%] h-[35%]' alt="Icone de calendário, para o modal de iniciar uma nova consulta" />
                </div>
                <h2 className='text-2xl font-bold m-0'>Próxima Consulta</h2>
                <h3 className='text-base text-wrap mb-4'>Informações do próximo agendamento</h3>
            </div>
            <div className="modal-body h-[50%] w-full flex flex-col justify-between items-center">
                <div className='bg-linear-to-r from-[#ECFEFF] to-[#EFF6FF]  w-[90%] h-[50%] rounded-lg'>
                    <div className='w-full h-full flex flex-col justify-around items-center gap-1'>
                        <div className='w-full h-1/2 flex flex-row justify-start items-center'>
                            <div className='w-1/8 h-full flex justify-center items-center'>
                                <img src={AgendaBlue} className='w-1/3 h-1/3' alt="Ícone de agenda azul" />
                            </div>
                            <div className='w-2/3 h-full flex flex-col justify-center items-start text-wrap gap-1'>
                                <label>Data</label>
                                <span id='data'>10 de Fevereiro de 2026</span>
                            </div>
                        </div>
                        <div className='w-full h-1/2 flex flex-row justify-start items-center'>
                            <div className='w-1/8 h-full flex justify-center items-center'>
                                <img src={relogio} className='w-1/3 h-1/3' alt="Ícone de relógio" />
                            </div>
                            <div className='w-2/3 h-full flex flex-col justify-center items-start text-wrap gap-1'>
                                <label>Horário</label>
                                <span id='horario'>14:00 - 15:00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[90%] h-[30%] flex flex-row justify-around items-center gap-1'>
                    <div className='w-[90%] h-[75%] flex flex-col justify-center items-start text-wrap gap-2 rounded-lg bg-gray-100 p-4'>
                        <label>Tipo</label>
                        <span id='tipo'>Retorno</span>
                    </div>
                    <div className='w-[90%] h-[75%] flex flex-col justify-center items-start text-wrap gap-2 rounded-lg bg-gray-100 p-4'>
                        <label>Profissional</label>
                        <span id='profissional'>Dr. Ana</span>
                    </div>
                </div>
                <div className='w-[90%] h-[22%] flex flex-col justify-center items-start text-wrap gap-2 rounded-lg bg-gray-100 p-4'>
                    <label>Tratamento</label>
                    <span id='tratamentoType'>Voz</span>
                </div>

                <div className='w-[90%] h-[20%] flex flex-row justify-center items-center gap-4'>
                    <button className='w-[80%] h-2/3 border-gray-200 border-2 rounded-lg hover:bg-blue-100' onClick={onClose}>
                        Fechar
                    </button>
                    <button className='w-[80%] h-2/3 bg-linear-to-r from-[#00b7db] to-[#2b80ff]  rounded-lg  text-bold text-white'>
                        Realizar anotações
                    </button>
                </div>
            </div>
        </Modal>
    )
}
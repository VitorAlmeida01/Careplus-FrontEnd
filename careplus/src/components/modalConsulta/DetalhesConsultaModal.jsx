import React from 'react'
import Modal from 'react-modal'
import agendaWhite from '/src/assets/agenda_white.png'

Modal.setAppElement('#root')

export default function DetalhesConsultaModal({ 
    isOpen, 
    onClose, 
    consulta = {
        data: '02/09/2025',
        horario: '16:00 - 17:00',
        especialidade: 'Fonoaudiologia',
        profissional: 'Dra. Ana Silva',
        tipo: 'Retorno',
        tratamento: 'Fonético',
        materiais: 'Brinquedos de encaixe, Livro de histórias',
        observacoes: 'Mostrou-se colaborativo com as atividades propostas. Buscou contato visual.\n\nSolicitou o fone abafador quando um barulho alto ocorreu no corredor. Comunicou suas vontades através de frases curtas.'
    }
}) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content max-h-[90vh] w-[95%] md:w-125 bg-white rounded-xl overflow-y-auto"
            overlayClassName="modal-overlay"
        >
            {/* Cabeçalho */}
            <div className="flex flex-col items-center gap-3 pt-6 pb-4">
                <div className='w-full px-6 flex justify-end'>
                    <button 
                        className="text-3xl text-gray-500 hover:bg-gray-100 rounded-lg w-10 h-10 flex items-center justify-center" 
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <div className='w-16 h-16 flex justify-center items-center bg-linear-to-r from-[#00b7db] to-[#2b80ff] rounded-xl'>
                    <img 
                        src={agendaWhite} 
                        className='w-8 h-8' 
                        alt="Ícone de calendário" 
                    />
                </div>
                <h2 className='text-xl font-semibold text-gray-800'>Detalhes da Consulta</h2>
            </div>

            {/* Corpo do Modal */}
            <div className="px-6 pb-6 space-y-4">
                {/* Card de Informações Principais */}
                <div className='bg-linear-to-r from-[#ECFEFF] to-[#EFF6FF] rounded-lg p-4 space-y-3'>
                    {/* Data e Horário */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-600'>Data:</label>
                            <p className='text-base text-gray-800'>{consulta.data}</p>
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-600'>Horário:</label>
                            <p className='text-base text-gray-800'>{consulta.horario}</p>
                        </div>
                    </div>

                    {/* Especialidade e Profissional */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-600'>Especialidade:</label>
                            <p className='text-base text-gray-800'>{consulta.especialidade}</p>
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-600'>Profissional:</label>
                            <p className='text-base text-gray-800'>{consulta.profissional}</p>
                        </div>
                    </div>

                    {/* Tipo e Tratamento */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-600'>Tipo:</label>
                            <p className='text-base text-gray-800'>{consulta.tipo}</p>
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-600'>Tratamento atual:</label>
                            <p className='text-base text-gray-800'>{consulta.tratamento}</p>
                        </div>
                    </div>
                </div>

                {/* Materiais Utilizados */}
                <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>Materiais Utilizados</h3>
                    <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                        <p className='text-sm text-gray-700 whitespace-pre-line'>{consulta.materiais}</p>
                    </div>
                </div>

                {/* Observações Comportamentais */}
                <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                        Observações Comportamentais (na sessão)
                    </h3>
                    <div className='bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-30'>
                        <p className='text-sm text-gray-700 whitespace-pre-line'>{consulta.observacoes}</p>
                    </div>
                </div>

                {/* Botão Fechar */}
                <div className='pt-2'>
                    <button 
                        className='w-full h-12 bg-linear-to-r from-[#00b7db] to-[#2b80ff] rounded-lg text-white font-medium hover:opacity-90 transition-opacity' 
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </Modal>
    )
}

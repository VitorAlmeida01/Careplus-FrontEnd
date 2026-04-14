import React from 'react';
import IniciarConsultaModal from '../../components/modalConsulta/IniciarConsultaModal';

export default function TesteModal() {
    const [modalAberto, setModalAberto] = React.useState(false);

    return (
        <div className='flex flex-col items-center justify-center h-screen gap-4 w-screen'>
            <button onClick={() => setModalAberto(true)} className='bg-blue200 h-full w-full' >
                Abrir Modal
            </button>
                <IniciarConsultaModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
        </div>
    );
}
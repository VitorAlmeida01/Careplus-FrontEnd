import './consultaAtual.css'
import Breadcrumb from './components/Breadcrumb'
import CardConsultaAtual from './components/CardConsultaAtual'
import ColunaDireita from './components/ColunaDireita'

export default function ConsultaAtual() {
    return(
        <div>
            <Breadcrumb />

            <div className='flex gap-5 max-w-screen'>
                <CardConsultaAtual
                 data="01/01/2024"
                 horario="14:00"
                 tipo="Consulta"
                 especialidade="Pediatria"
                 profissional="Dr. Silva"
                 tratamentoAtual="Terapia Ocupacional"
                />

                <ColunaDireita />

            </div>

        </div>
    )
}
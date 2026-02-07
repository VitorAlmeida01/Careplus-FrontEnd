import './consultaAtual.css'
import Breadcrumb from './components/Breadcrumb'
import CardConsultaAtual from './components/CardConsultaAtual'
import ColunaDireita from './components/ColunaDireita'

export default function ConsultaAtual() {
    return(
        <div>
            <Breadcrumb />

            <div className='container-principal'>
                <CardConsultaAtual />

                <ColunaDireita />

            </div>

        </div>
    )
}
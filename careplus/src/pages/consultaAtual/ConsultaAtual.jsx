import CardConsultaAtual from './components/CardConsultaAtual'
import ColunaDireita from './components/ColunaDireita'
import Layout from '../../components/layout/Layout'

export default function ConsultaAtual() {
    return(
        <Layout>
  

            <div className='flex ml-5 gap-5 w-[95%] p-4'>
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

     </Layout>   
    )
}
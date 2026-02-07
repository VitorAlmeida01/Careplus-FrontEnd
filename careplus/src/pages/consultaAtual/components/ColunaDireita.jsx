import CardDadosPaciente from './CardDadosPaciente'
import CardUltimaConsulta from './CardUltimaConsulta'
import CardReforcadores from './CardReforcadores'

// achei daora que dentro de um componente a gente pode usar outros componentes, 
// isso deixa o código mais organizado e fácil de ler

export default function ColunaDireita() {
  return (
    <div className="coluna-direita">
      
      <CardDadosPaciente
      nome="João Silva"
      contato="(11) 99999-9999"
      idade="10 anos"
      cid="F84.0"
      desfraldado="Sim"
      hiperfocoAtual="Desenhos animados"
      medicacoes="Nenhuma"
      diagnostico="Transtorno do Espectro Autista"
      atendimentoEspecial="Terapia Ocupacional"
      />

      <CardUltimaConsulta
       data="31/12/2023"
       tratamento="Terapia Ocupacional"
      />

      <CardReforcadores />
    </div>
  )
}

import CardDadosPaciente from './CardDadosPaciente'
import CardUltimaConsulta from './CardUltimaConsulta'
import CardReforcadores from './CardReforcadores'

// achei daora que dentro de um componente a gente pode usar outros componentes, isso deixa o código mais organizado e fácil de ler
export default function ColunaDireita() {
  return (
    <div className="coluna-direita">
      <CardDadosPaciente />
      <CardUltimaConsulta />
      <CardReforcadores />
    </div>
  )
}

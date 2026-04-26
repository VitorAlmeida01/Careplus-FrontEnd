import CardDadosPaciente from './CardDadosPaciente'
import CardUltimaConsulta from './CardUltimaConsulta'
import CardReforcadores from './CardReforcadores'

// achei daora que dentro de um componente a gente pode usar outros componentes, 
// isso deixa o código mais organizado e fácil de ler

export default function ColunaDireita({ dadosPaciente, ultimaConsulta }) {
  const formatarBoolean = (valor) => {
    if (valor === true) return "Sim"
    if (valor === false) return "Não"
    return "-"
  }

  const formatarData = (valor) => {
    if (!valor) return "-"
    const dataTexto = String(valor)

    if (/^\d{4}-\d{2}-\d{2}$/.test(dataTexto)) {
      const [ano, mes, dia] = dataTexto.split("-")
      return `${dia}/${mes}/${ano}`
    }

    const data = new Date(dataTexto)
    if (Number.isNaN(data.getTime())) return "-"
    return data.toLocaleDateString("pt-BR")
  }

  return (
    <div className="flex w-full sm:w-[40%] mt-[5px] flex-col gap-[15px]">
      
      <CardDadosPaciente
      nome={dadosPaciente?.nome || "-"}
      contato={dadosPaciente?.contato || "-"}
      idade={
        dadosPaciente?.idade !== null && dadosPaciente?.idade !== undefined
          ? `${dadosPaciente.idade} anos`
          : "-"
      }
      desfraldado={formatarBoolean(dadosPaciente?.desfraldado)}
      hiperfocoAtual={dadosPaciente?.hiperfocoAtual || "-"}
      diagnostico={dadosPaciente?.diagnostico || "-"}
      atendimentoEspecial={dadosPaciente?.atendimentoEspecial || "-"}
      />

      <CardUltimaConsulta
       consultaId={ultimaConsulta?.consultaId}
       data={formatarData(ultimaConsulta?.data)}
        nomeFuncionario={
          ultimaConsulta?.nomeFuncionarioUltimaConsulta ||
          ultimaConsulta?.nomeFuncionario ||
          "-"
        }
      />

      <CardReforcadores />
    </div>
  )
}

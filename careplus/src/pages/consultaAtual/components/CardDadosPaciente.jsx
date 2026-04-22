import LinhaInformacao from "./LinhaInformacao";

export default function CardDadosPaciente({
  nome,
  contato,
  idade,
  desfraldado,
  hiperfocoAtual,
  diagnostico,
  atendimentoEspecial 
}) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-[35px] h-[35px] rounded-[8px] flex items-center justify-center text-[18px] bg-[#00bfa5] text-white ">👤</div>
        <h2 className="text-lg font-semibold text-gray-800">Dados do Paciente</h2>
      </div>

      <div className="flex flex-col gap-4 w-[95%]">

      <LinhaInformacao tipo1="Nome" dado1={nome} tipo2="Contato" dado2={contato} />
      <LinhaInformacao tipo1="Desfraldado" dado1={desfraldado} tipo2="Hiperfoco Atual" dado2={hiperfocoAtual} />
      <LinhaInformacao tipo1="Diagnóstico" dado1={diagnostico} tipo2="Atendimento Especial" dado2={atendimentoEspecial} />
      <LinhaInformacao tipo1="Idade" dado1={idade} tipo2="" dado2="" />
        
      </div>
    </div>
  )
}

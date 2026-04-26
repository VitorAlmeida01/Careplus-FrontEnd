import LinhaInformacao from "./LinhaInformacao"

export default function CardConsultaAtual({
  data,
  horario,
  tipo,
  especialidade,
  profissional
}) {
  return (
    <div className="flex w-full items-center justify-center bg-white rounded-[10px] sm:w-[50vw]">
      <div className="flex w-[95%]  h-[99%] justify-around items-center flex-col gap-3 p-4">

      <div className="flex w-[90%] items-center gap-3 p-4">
        <div className="  
        w-[35px] h-[35px]
        rounded-lg
        flex items-center justify-center
        text-[18px]
        bg-[#00b8d4] text-white
        ">📄</div>
        <h2>Consulta Atual</h2>
      </div>

      <div className="flex flex-col justify-between gap-[15px] w-[90%] h-[75%] ">

        <LinhaInformacao tipo1="Data" dado1={data} tipo2="Horário" dado2={horario} />
        <LinhaInformacao tipo1="Tipo" dado1={tipo} tipo2="Especialidade" dado2={especialidade} />
        <LinhaInformacao tipo1="Profissional" dado1={profissional} tipo2="" dado2="" />


        <div className="mt-[10px]">
          <textarea
            className="
              bg-[#f8f8f8]
              border border-[#000000]
              rounded-lg
              p-[15px]
              min-h-[300px]
              w-full
              resize-none
            "
            placeholder="Descreva aqui"
          />
        </div>

      </div>

      <button
        className="
          w-[50%]
          h-[45px]
          bg-[#00b8d4]
          text-white
          border-0
          rounded-lg
          p-[12px]
          text-[16px]
          font-semibold
          cursor-pointer
          mt-5
        "
        >
      Salvar
      </button>

      </div>
    </div>
  )
}

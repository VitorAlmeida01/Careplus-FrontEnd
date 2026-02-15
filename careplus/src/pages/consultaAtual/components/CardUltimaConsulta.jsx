export default function CardUltimaConsulta({
  data,
  tratamento
}) {
  return (
    <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center mb-[15px]">
        <h3 className="text-lg font-semibold text-gray-800">Última consulta</h3>
        <button className="bg-white 
               border border-[#00bfa5] 
               text-[#00bfa5] 
               py-[6px] px-5 
               rounded-[6px] 
               text-sm font-medium 
               cursor-pointer
               hover:bg-[#e0f7f4]">
          Ver
        </button>
      </div>

      <div className="flex flex-col gap-[15px] w-[95%]">
        <div className="flex-1 flex flex-col gap-[5px]">
          <span className="text-[13px] text-[#666] font-medium">Data:</span>
          <span className="text-sm text-[#333] font-normal">{data}</span>
        </div>
        <div className="flex-1 flex flex-col gap-[5px]">
          <span className="text-[13px] text-[#666] font-medium">Tratamento:</span>
          <span className="text-sm text-[#333] font-normal">{tratamento}</span>
        </div>
      </div>
    </div>
  )
}

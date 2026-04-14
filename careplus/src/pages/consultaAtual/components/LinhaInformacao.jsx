export default function LinhaInformacao({ tipo1, dado1, tipo2, dado2 }) {
    return (   
   <div className="flex gap-[20px]">
          <div className="flex flex-col gap-[5px] w-[95%]">
            <span className="text-[13px] text-gray-900 font-normal">{tipo1}:</span>
            <span className="text-[14px] text-gray-700 font-normal">{dado1}</span>
          </div>
          <div className="flex flex-col gap-[5px] w-[95%]">
            <span className="text-[13px] text-gray-900 font-normal">{tipo2}:</span>
            <span className="text-[14px] text-gray-700 font-normal">{dado2}</span>
          </div>
        </div>
    )
}

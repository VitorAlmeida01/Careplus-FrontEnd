export default function LinhaInformacao({ tipo1, dado1, tipo2, dado2 }) {
    const deveExibirSegundaColuna =
      tipo2 !== undefined &&
      tipo2 !== null &&
      String(tipo2).trim() !== "" &&
      dado2 !== undefined &&
      dado2 !== null &&
      String(dado2).trim() !== ""

    return (   
   <div className="flex gap-5">
          <div className="flex flex-col gap-1.25 w-[95%]">
            <span className="text-[13px] text-gray-900 font-normal">{tipo1}:</span>
            <span className="text-[14px] text-gray-700 font-normal">{dado1}</span>
          </div>
          {deveExibirSegundaColuna && (
            <div className="flex flex-col gap-1.25 w-[95%]">
              <span className="text-[13px] text-gray-900 font-normal">{tipo2}:</span>
              <span className="text-[14px] text-gray-700 font-normal">{dado2}</span>
            </div>
          )}
        </div>
    )
}

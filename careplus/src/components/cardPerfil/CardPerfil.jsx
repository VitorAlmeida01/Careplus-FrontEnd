import logo from "/src/assets/logo.png"

export default function CardPerfil({ onContatoClick, onProximaConsultaClick, fichaClinica }) {
  const nomePaciente = fichaClinica?.nome || "-"
  const idadePaciente = fichaClinica?.fichaClinica?.idade

  return (
    <div className="flex md:flex-row flex-col justify-between mb-2 gap-5  w-full items-center bg-[#FFFF] p-4 md:p-6 rounded-2xl shadow-xl md:w-full lg:w-full">
      <div className="flex gap-4">
        <img src={logo} alt="" className="w-16 md:w-20" />
        <div className="flex flex-col gap-3">
          <h2>{nomePaciente}</h2>
          <div className="flex gap-3">
            <p className="text-sm text-[#4B5563]">
              <b>Idade:</b> {idadePaciente ?? "-"} anos
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start h-full gap-3">
        <button
          onClick={onContatoClick}
          className="border border-[#D1D5DC] rounded-xl p-2 bg-white hover:bg-linear-to-r from-[#00B8DB] to-[#2B7FFF] hover:text-white cursor-pointer"
        >
          Contato
        </button>
        <button
          onClick={onProximaConsultaClick}
          className="border border-[#D1D5DC] rounded-xl p-2 bg-white hover:bg-linear-to-r from-[#00B8DB] to-[#2B7FFF] hover:text-white cursor-pointer"
        >
          Próxima Consulta
        </button>
      </div>
    </div>
  )
}

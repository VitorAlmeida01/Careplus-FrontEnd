export default function BotaoLayout({ nome, tamanho }) {
  return (
    <button
      className={`border-2 border-[#D1D5DC] rounded-md p-1 bg-white hover:bg-linear-to-r from-[#00B8DB] to-[#2B7FFF] hover:text-white cursor-pointer ${tamanho}`}
    >
      {nome}
    </button>
  )
}

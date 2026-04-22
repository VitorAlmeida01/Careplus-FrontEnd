import "./style.css"

export default function BotaoCadastro({ onClick, name }) {
  return (
    <>
      <button className="px-4 py-[15px] bg-gradient-to-r from-[#00a0ff] to-[#00d48c] text-white border-none rounded-md text-[1.6ch] transition-all duration-200 hover:cursor-pointer hover:border hover:border-black/55 hover:shadow-[7px_6px_15px_-5px_#000000]" onClick={onClick}>
        {name}
      </button>
    </>
  )
}

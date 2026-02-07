import "./style.css"

export default function BotaoCadastro({ onClick }) {
  return (
    <>
      <button className="botaoCadastro" onClick={onClick}>
        Cadastrar
      </button>
    </>
  )
}

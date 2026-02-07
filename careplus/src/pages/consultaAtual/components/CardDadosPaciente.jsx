export default function CardDadosPaciente() {
  return (
    <div className="card-dados-paciente">
      <div className="cabecalho-card">
        <div className="icone-card icone-verde">👤</div>
        <h2>Dados do Paciente</h2>
      </div>

      <div className="conteudo-card">
        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Nome:</span>
            <span className="valor">-</span>
          </div>
          <div className="campo">
            <span className="label">Contato:</span>
            <span className="valor">-</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Idade:</span>
            <span className="valor">-</span>
          </div>
          <div className="campo">
            <span className="label">CID:</span>
            <span className="valor">-</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Desfraldado:</span>
            <span className="valor">-</span>
          </div>
          <div className="campo">
            <span className="label">Hiperfoco Atual:</span>
            <span className="valor">-</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Medicações:</span>
            <span className="valor">-</span>
          </div>
          <div className="campo">
            <span className="label">Diagnóstico:</span>
            <span className="valor">-</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo campo-completo">
            <span className="label">Atendimento Especial:</span>
            <span className="valor">-</span>
          </div>
        </div>
      </div>
    </div>
  )
}

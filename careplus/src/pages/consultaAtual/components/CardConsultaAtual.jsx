export default function CardConsultaAtual() {
  return (
    <div className="card-consulta-atual">
      <div className="cabecalho-card">
        <div className="icone-card icone-azul">📄</div>
        <h2>Consulta Atual</h2>
      </div>

      <div className="conteudo-card">

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Data:</span>
            <span className="valor">-</span>
          </div>
          <div className="campo">
            <span className="label">Horário:</span>
            <span className="valor">-</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Tipo:</span>
            <span className="valor">-</span>
          </div>
          <div className="campo">
            <span className="label">Especialidade:</span>
            <span className="valor">-</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Profissional:</span>
            <span className="valor">-</span>
          </div>
          <div className="campo">
            <span className="label">Tratamento atual:</span>
            <span className="valor">-</span>
          </div>
        </div>

        <div className="secao-observacoes">
          <h3>Observações Comportamentais (na sessão)</h3>
          <div className="caixa-texto">
            <p>Carregando...</p>
          </div>
        </div>

      </div>

      <button className="botao-salvar">Salvar</button>
    </div>
  )
}

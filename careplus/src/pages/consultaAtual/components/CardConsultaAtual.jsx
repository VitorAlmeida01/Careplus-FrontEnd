export default function CardConsultaAtual({
  data,
  horario,
  tipo,
  especialidade,
  profissional,
  tratamentoAtual
}) {
  return (
    <div className="flex-1 bg-white rounded-[10px] p-[25px]">
      <div className="cabecalho-card">
        <div className="icone-card icone-azul">📄</div>
        <h2>Consulta Atual</h2>
      </div>

      <div className="conteudo-card">

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Data:</span>
            <span className="valor">{data}</span>
          </div>
          <div className="campo">
            <span className="label">Horário:</span>
            <span className="valor">{horario}</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Tipo:</span>
            <span className="valor">{tipo}</span>
          </div>
          <div className="campo">
            <span className="label">Especialidade:</span>
            <span className="valor">{especialidade}</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Profissional:</span>
            <span className="valor">{profissional}</span>
          </div>
          <div className="campo">
            <span className="label">Tratamento atual:</span>
            <span className="valor">{tratamentoAtual}</span>
          </div>
        </div>

        <div className="secao-observacoes">
          <h3>Observações Comportamentais (na sessão)</h3>
          <textarea className="caixa-texto">
    
          </textarea>
        </div>

      </div>

      <button className="botao-salvar">Salvar</button>
    </div>
  )
}
